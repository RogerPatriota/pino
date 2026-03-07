import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Funcionario } from '../domain/funcionario.entity';
import { IFuncionarioRepository } from '../domain/funcionario.repository.interface';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class FuncionarioService {
  constructor(
    private readonly repository: IFuncionarioRepository,
  ) {}

  async findAll(assistenciaId: string): Promise<Funcionario[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[FuncionarioService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar funcionários');
    }
  }

  async findById(id: string): Promise<Funcionario> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Funcionário não encontrado');

      return entity;
    } catch (error) {
      console.error(`[FuncionarioService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar funcionário');
    }
  }

  async findByEmail(assistenciaId: string, email: string): Promise<Funcionario> {
    try {
      const entity = await this.repository.findByEmail(assistenciaId, email);
      if (!entity) throw new NotFoundException('Funcionário não encontrado');

      return entity;
    } catch (error) {
      console.error(`[FuncionarioService.findByEmail] Email: ${email}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar funcionário');
    }
  }

  async create(dto: CreateFuncionarioDto): Promise<Funcionario> {
    try {
      const entity = new Funcionario(dto);
      entity.senha = await bcrypt.hash(dto.senha, SALT_ROUNDS);

      return await this.repository.create(entity);
    } catch (error) {
      console.error('[FuncionarioService.create]', error);
      if (error.cause?.constraint === 'funcionarios_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'funcionarios_assistencia_email_unique') {
        throw new HttpException('Email já cadastrado nesta assistência', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'funcionarios_assistencia_numero_unique') {
        throw new HttpException('Número já cadastrado nesta assistência', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar funcionário');
    }
  }

  async update(id: string, dto: UpdateFuncionarioDto): Promise<Funcionario> {
    const exists = await this.findById(id);

    try {
      const updateData: Partial<Funcionario> = { ...dto };

      if (dto.senha) {
        updateData.senha = await bcrypt.hash(dto.senha, SALT_ROUNDS);
      }

      const merged = new Funcionario({ ...exists, ...updateData });
      return await this.repository.update(id, merged);
    } catch (error) {
      console.error(`[FuncionarioService.update] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar funcionário');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[FuncionarioService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar funcionário');
    }
  }
}
