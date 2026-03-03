import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Movimentacao } from '../domain/movimentacao.entity';
import { IEstoqueRepository } from '../domain/estoque.repository.interface';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';

@Injectable()
export class EstoqueService {
  constructor(private readonly repository: IEstoqueRepository) {}

  async listarPorAssistencia(assistenciaId: string): Promise<Movimentacao[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[EstoqueService.listarPorAssistencia]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao listar movimentações');
    }
  }

  async listarPorProduto(produtoId: string): Promise<Movimentacao[]> {
    try {
      return await this.repository.findAllByProduto(produtoId);
    } catch (error) {
      console.error(`[EstoqueService.listarPorProduto] produtoId: ${produtoId}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao listar movimentações do produto');
    }
  }

  async registrarMovimentacao(dto: CreateMovimentacaoDto): Promise<Movimentacao> {
    if (dto.tipo !== 'ajuste_manual' && dto.quantidade <= 0) {
      throw new BadRequestException('Quantidade deve ser um inteiro positivo para este tipo de movimentação');
    }
    if (dto.tipo === 'ajuste_manual' && dto.quantidade === 0) {
      throw new BadRequestException('Quantidade de ajuste não pode ser zero');
    }
    if (dto.tipo === 'entrada' && !dto.precoUnidade) {
      throw new BadRequestException('precoUnidade é obrigatório para movimentações do tipo entrada');
    }

    const precoCusto = dto.precoUnidade
      ? (parseFloat(dto.precoUnidade) * Math.abs(dto.quantidade)).toFixed(2)
      : null;

    try {
      return await this.repository.transaction(async (tx) => {
        const movimentacao = new Movimentacao({
          ...dto,
          precoUnidade: dto.precoUnidade ?? null,
          precoCusto,
        });

        const criada = await this.repository.createMovimentacao(movimentacao, tx);
        await this.repository.atualizarEstoqueProduto(dto.produtoId, movimentacao.delta, tx);

        return criada;
      });
    } catch (error) {
      console.error('[EstoqueService.registrarMovimentacao]', error);

      if (error.cause?.constraint === 'estoque_movimentacoes_produto_id_produtos_id_fk') {
        throw new HttpException('Produto não encontrado', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'estoque_movimentacoes_funcionario_id_funcionarios_id_fk') {
        throw new HttpException('Funcionário não encontrado', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'estoque_movimentacoes_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao registrar movimentação de estoque');
    }
  }
}

