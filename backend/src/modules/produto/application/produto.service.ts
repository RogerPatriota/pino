import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Produto } from '../domain/produto.entity';
import { IProdutoRepository } from '../domain/produto.repository.interface';
import { ContadorService } from '../../../shared/contador.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly repository: IProdutoRepository,
    private readonly contadorService: ContadorService,
  ) {}

  async findAll(assistenciaId: string): Promise<Produto[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[ProdutoService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar produtos');
    }
  }

  async findById(id: string): Promise<Produto> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Produto não encontrado');
      return entity;
    } catch (error) {
      console.error(`[ProdutoService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar produto');
    }
  }

  async create(dto: CreateProdutoDto): Promise<Produto> {
    try {
      const contador = await this.contadorService.nextValue(dto.assistenciaId, 'produto');
      const sku = `PROD-${contador}`;

      const entity = new Produto({ ...dto, sku });
      return await this.repository.create(entity);
    } catch (error) {
      console.error('[ProdutoService.create]', error);
      if (error.cause?.constraint === 'produtos_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'produtos_assistencia_sku_unique') {
        throw new HttpException('SKU já cadastrado nesta assistência', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar produto');
    }
  }

  async update(id: string, dto: UpdateProdutoDto): Promise<Produto> {
    const exists = await this.findById(id);
    try {
      const merged = new Produto({ ...exists, ...dto });
      return await this.repository.update(id, merged);
    } catch (error) {
      console.error(`[ProdutoService.update] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar produto');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[ProdutoService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar produto');
    }
  }
}
