import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdemServico } from '../domain/os.entity';
import { OsProduto } from '../domain/os-produto.entity';
import { OsServico } from '../domain/os-servico.entity';
import { IOsRepository, OsDetalhe, OsFiltros } from '../domain/os.repository.interface';
import { IEstoqueRepository } from '../../estoque/domain/estoque.repository.interface';
import { Movimentacao } from '../../estoque/domain/movimentacao.entity';
import { ContadorService } from '../../../shared/contador.service';
import { CreateOsDto } from './dto/create-os.dto';
import { UpdateOsStatusDto } from './dto/update-os-status.dto';

@Injectable()
export class OsService {
  constructor(
    private readonly repository: IOsRepository,
    private readonly estoqueRepository: IEstoqueRepository,
    private readonly contadorService: ContadorService,
  ) {}

  async findAll(assistenciaId: string, filtros?: OsFiltros): Promise<OrdemServico[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId, filtros);
    } catch (error) {
      console.error('[OsService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao listar ordens de serviço');
    }
  }

  async findById(id: string, assistenciaId: string): Promise<OsDetalhe> {
    try {
      const entity = await this.repository.findById(id, assistenciaId);
      if (!entity) throw new NotFoundException('Ordem de serviço não encontrada');
      return entity;
    } catch (error) {
      console.error(`[OsService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar ordem de serviço');
    }
  }

  async create(dto: CreateOsDto): Promise<OsDetalhe> {
    try {
      return await this.repository.transaction(async (tx) => {
        // 1. Gerar número da OS atomicamente dentro da transação
        const numeroOs = await this.contadorService.nextValue(dto.assistenciaId, 'os', tx);

        // 2. Criar a OS base
        const entity = new OrdemServico({
          assistenciaId: dto.assistenciaId,
          numeroOs,
          clienteId: dto.clienteId,
          aparelhoId: dto.aparelhoId,
          funcionarioId: dto.funcionarioId,
          relatoCliente: dto.relatoCliente,
          laudoTecnico: dto.laudoTecnico,
          observacoesInternas: dto.observacoesInternas,
        });
        const os = await this.repository.create(entity, tx);

        // 3. Inserir produtos com preço congelado + baixa de estoque
        if (dto.produtos && dto.produtos.length > 0) {
          for (const item of dto.produtos) {
            if (item.quantidade <= 0) {
              throw new BadRequestException(`Quantidade inválida para o produto ${item.produtoId}`);
            }

            // Congelar preço atual do produto
            const precoVenda = await this.repository.findProdutoPreco(item.produtoId);
            if (precoVenda === null) {
              throw new NotFoundException(`Produto ${item.produtoId} não encontrado`);
            }

            // Inserir na junção os_produtos
            const osProduto = new OsProduto({
              osId: os.id,
              produtoId: item.produtoId,
              precoVenda,
              quantidade: item.quantidade,
            });
            await this.repository.addProduto(osProduto, tx);

            // Baixa de estoque - saida_venda
            const movimentacao = new Movimentacao({
              assistenciaId: dto.assistenciaId,
              produtoId: item.produtoId,
              funcionarioId: dto.funcionarioId ?? os.id, // fallback para osId se não tiver funcionário
              tipo: 'saida_venda',
              quantidade: item.quantidade,
              motivo: `OS-${String(numeroOs).padStart(3, '0')}`,
            });

            await this.estoqueRepository.createMovimentacao(movimentacao, tx);
            await this.estoqueRepository.atualizarEstoqueProduto(item.produtoId, movimentacao.delta, tx);
          }
        }

        // 4. Inserir serviços com preço congelado
        if (dto.servicos && dto.servicos.length > 0) {
          for (const item of dto.servicos) {
            if (item.quantidade <= 0) {
              throw new BadRequestException(`Quantidade inválida para o serviço ${item.servicoId}`);
            }

            // Congelar preço atual do serviço
            const valorCobrado = await this.repository.findServicoPreco(item.servicoId);
            if (valorCobrado === null) {
              throw new NotFoundException(`Serviço ${item.servicoId} não encontrado`);
            }

            const osServico = new OsServico({
              osId: os.id,
              servicoId: item.servicoId,
              valorCobrado,
              quantidade: item.quantidade,
            });
            await this.repository.addServico(osServico, tx);
          }
        }

        // 5. Recalcular valorTotal via SUM no banco
        await this.repository.recalcularValorTotal(os.id, tx);

        // 6. Retornar OS completa com produtos e serviços
        const osCompleta = await this.repository.findById(os.id, dto.assistenciaId);
        return osCompleta!;
      });
    } catch (error) {
      console.error('[OsService.create]', error);
      if (error.cause?.constraint === 'ordens_servico_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'ordens_servico_cliente_id_clientes_id_fk') {
        throw new HttpException('Cliente não encontrado', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'ordens_servico_aparelho_id_log_aparelhos_id_fk') {
        throw new HttpException('Log de aparelho não encontrado', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'estoque_movimentacoes_produto_id_produtos_id_fk') {
        throw new HttpException('Produto não encontrado no estoque', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar ordem de serviço');
    }
  }

  async updateStatus(id: string, assistenciaId: string, dto: UpdateOsStatusDto): Promise<OrdemServico> {
    await this.findById(id, assistenciaId);
    try {
      return await this.repository.updateStatus(id, dto.status);
    } catch (error) {
      console.error(`[OsService.updateStatus] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar status da ordem de serviço');
    }
  }
}
