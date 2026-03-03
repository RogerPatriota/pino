import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Categoria } from '../domain/categoria.entity';
import { ICategoriaRepository } from '../domain/categoria.repository.interface';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly repository: ICategoriaRepository) {}

  async findAll(assistenciaId: string): Promise<Categoria[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[CategoriaService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar categorias');
    }
  }

  async findById(id: string): Promise<Categoria> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Categoria não encontrada');
      return entity;
    } catch (error) {
      console.error(`[CategoriaService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar categoria');
    }
  }

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    try {
      const entity = new Categoria(dto);
      return await this.repository.create(entity);
    } catch (error) {
      console.error('[CategoriaService.create]', error);
      if (error.cause?.constraint === 'categorias_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar categoria');
    }
  }

  async update(id: string, dto: UpdateCategoriaDto): Promise<Categoria> {
    const exists = await this.findById(id);
    try {
      const merged = new Categoria({ ...exists, ...dto });
      return await this.repository.update(id, merged);
    } catch (error) {
      console.error(`[CategoriaService.update] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar categoria');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[CategoriaService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar categoria');
    }
  }
}
