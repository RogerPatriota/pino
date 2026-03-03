import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Cliente } from '../domain/cliente.entity';
import { IClienteRepository } from '../domain/cliente.repository.interface';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    private readonly repository: IClienteRepository,
  ) {}

  async findAll(assistenciaId: string): Promise<Cliente[]> {
    try {
      return await this.repository.findAllByAssistencia(assistenciaId);
    } catch (error) {
      console.error('[ClienteService.findAll]', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar clientes');
    }
  }

  async findById(id: string): Promise<Cliente> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Cliente não encontrado');

      return entity;
    } catch (error) {
      console.error(`[ClienteService.findById] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar cliente');
    }
  }

  async create(dto: CreateClienteDto): Promise<Cliente> {
    try {
      const entity = new Cliente(dto);
      return await this.repository.create(entity);
    } catch (error) {
      console.error('[ClienteService.create]', error);
      if (error.cause?.constraint === 'clientes_assistencia_id_assistencias_id_fk') {
        throw new HttpException('Assistência não encontrada', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'clientes_assistencia_numero_unique') {
        throw new HttpException('Número já cadastrado nesta assistência', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'clientes_assistencia_cpf_cnpj_unique') {
        throw new HttpException('CPF/CNPJ já cadastrado nesta assistência', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao criar cliente');
    }
  }

  async update(id: string, dto: UpdateClienteDto): Promise<Cliente> {
    const exists = await this.findById(id);

    try {
      const merged = new Cliente({ ...exists, ...dto });
      return await this.repository.update(id, merged);
    } catch (error) {
      console.error(`[ClienteService.update] ID: ${id}`, error);
      if (error.cause?.constraint === 'clientes_assistencia_numero_unique') {
        throw new HttpException('Número já cadastrado nesta assistência', HttpStatus.BAD_REQUEST);
      }
      if (error.cause?.constraint === 'clientes_assistencia_cpf_cnpj_unique') {
        throw new HttpException('CPF/CNPJ já cadastrado nesta assistência', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar cliente');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`[ClienteService.delete] ID: ${id}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao deletar cliente');
    }
  }
}
