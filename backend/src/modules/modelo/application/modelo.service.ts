import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Modelo } from '../domain/modelo.entity';
import { IModeloRepository } from '../domain/modelo.repository.interface';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';

@Injectable()
export class ModeloService {
  constructor(
    private readonly repository: IModeloRepository,
  ) {}

  async findAll(assistenciaId: string): Promise<Modelo[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[ModeloService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar modelos');
    }
  }

  async findById(id: string): Promise<Modelo> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Modelo não encontrado');

      return entity;
    } catch (error) {
      console.error(`[ModeloService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar modelo');
    }
  }

  async create(dto: CreateModeloDto): Promise<Modelo> {
    try {
      const entity = new Modelo(dto);
      return await this.repository.create(entity);
    } catch (error) {
      console.error('[ModeloService.create]', error);
      if (error.cause?.constraint === 'modelos_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar modelo');
    }
  }

  async update(id: string, dto: UpdateModeloDto): Promise<Modelo> {
    const exists = await this.findById(id);

    try {
      const merged = new Modelo({ ...exists, ...dto });
      return await this.repository.update(id, merged);
    } catch (error) {
      console.error(`[ModeloService.update] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar modelo');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[ModeloService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar modelo');
    }
  }
}
