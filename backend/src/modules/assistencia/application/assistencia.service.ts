import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Assistencia } from '../domain/assistencia.entity';
import { IAssistenciaRepository } from '../domain/assistencia.repository.interface';
import { CreateAssistenciaDto } from './dto/create-assistencia.dto';
import { UpdateAssistenciaDto } from './dto/update-assistencia.dto';
import { ContadorService } from './contador.service';

@Injectable()
export class AssistenciaService {
  constructor(
    private readonly repository: IAssistenciaRepository,
    private readonly contadorService: ContadorService
  ) {}

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
      const entity = new Assistencia(dto);

      return await this.repository.transaction(async (tx) => {
        const created = await this.repository.create(entity, tx);
        await this.contadorService.initialize(created.id, tx);
        return created;
      });
    } catch (error) {
      console.error('[AssistenciaService.create]', error);

      if (error.cause?.constraint == 'assistencias_cnpj_unique') {
        throw new HttpException('CNPJ já cadastrado', HttpStatus.BAD_REQUEST);
      }
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
