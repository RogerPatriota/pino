import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { LogAparelho } from '../domain/log-aparelho.entity';
import { ILogAparelhoRepository } from '../domain/log-aparelho.repository.interface';

@Injectable()
export class LogAparelhoService {
  constructor(
    private readonly repository: ILogAparelhoRepository,
  ) {}

  async findAllByAssistencia(assistenciaId: string): Promise<LogAparelho[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[LogAparelhoService.findAllByAssistencia]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar aparelhos');
    }
  }

  async findById(id: string): Promise<LogAparelho> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Aparelho não encontrado');

      return entity;
    } catch (error) {
      console.error(`[LogAparelhoService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar aparelho');
    }
  }

  async create(data: Partial<LogAparelho>): Promise<LogAparelho> {
    try {
      const entity = new LogAparelho(data as any);
      return await this.repository.create(entity);
    } catch (error) {
      console.error('[LogAparelhoService.create]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar aparelho');
    }
  }

  async update(id: string, data: Partial<LogAparelho>): Promise<LogAparelho> {
    const exists = await this.findById(id);

    try {
      const merged = new LogAparelho({ ...exists, ...data } as any);
      return await this.repository.update(id, merged);
    } catch (error) {
      console.error(`[LogAparelhoService.update] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar aparelho');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[LogAparelhoService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar aparelho');
    }
  }
}
