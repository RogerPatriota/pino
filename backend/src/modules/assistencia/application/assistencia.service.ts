import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Assistencia } from '../domain/assistencia.entity';
import { IAssistenciaRepository } from '../domain/assistencia.repository.interface';
import { CreateAssistenciaDto } from './dto/create-assistencia.dto';
import { UpdateAssistenciaDto } from './dto/update-assistencia.dto';

@Injectable()
export class AssistenciaService {
  constructor(private readonly repository: IAssistenciaRepository) {}

  async findAll(): Promise<Assistencia[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('[AssistenciaService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar assistências');
    }
  }

  async findById(id: string): Promise<Assistencia> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Assistência não encontrada');
      return entity;
    } catch (error) {
      console.error(`[AssistenciaService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar assistência');
    }
  }

  async create(dto: CreateAssistenciaDto): Promise<Assistencia> {
    try {
      const entity = new Assistencia(dto); // valida CNPJ aqui
      return await this.repository.create(entity);
    } catch (error) {
      console.error('[AssistenciaService.create]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar assistência');
    }
  }

  async update(id: string, dto: UpdateAssistenciaDto): Promise<Assistencia> {
    const exists = await this.findById(id);

    try {
      const entity = new Assistencia({ ...exists, ...dto });
      return await this.repository.update(id, entity);
    } catch (error) {
      console.error(`[AssistenciaService.update] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar assistência');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[AssistenciaService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar assistência');
    }
  }
}
