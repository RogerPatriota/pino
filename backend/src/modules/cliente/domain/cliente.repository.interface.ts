import { Cliente } from './cliente.entity';

export abstract class IClienteRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<Cliente[]>;
  abstract findById(id: string): Promise<Cliente | null>;
  abstract findByCpfCnpj(assistenciaId: string, cpfCnpj: string): Promise<Cliente | null>;
  abstract create(entity: Partial<Cliente>): Promise<Cliente>;
  abstract update(id: string, entity: Partial<Cliente>): Promise<Cliente>;
  abstract delete(id: string): Promise<void>;
}
