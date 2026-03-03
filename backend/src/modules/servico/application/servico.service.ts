import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Servico } from '../domain/servico.entity';
import { IServicoRepository } from '../domain/servico.repository.interface';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Injectable()
export class ServicoService {
  constructor(
    private readonly repository: IServicoRepository,
  ) {}

  async findAll(assistenciaId: string): Promise<Servico[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[ServicoService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar serviços');
    }
  }

  async findById(id: string): Promise<Servico> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Serviço não encontrado');

      return entity;
    } catch (error) {
      console.error(`[ServicoService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar serviço');
    }
  }

  async create(dto: CreateServicoDto): Promise<Servico> {
    try {
      const entity = new Servico(dto);
      return await this.repository.create(entity);
    } catch (error) {
      console.error('[ServicoService.create]', error);
      if (error.cause?.constraint === 'servicos_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar serviço');
    }
  }

  async update(id: string, dto: UpdateServicoDto): Promise<Servico> {
    const exists = await this.findById(id);

    try {
      const merged = new Servico({ ...exists, ...dto });
      return await this.repository.update(id, merged);
    } catch (error) {
      console.error(`[ServicoService.update] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar serviço');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[ServicoService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar serviço');
    }
  }
}
