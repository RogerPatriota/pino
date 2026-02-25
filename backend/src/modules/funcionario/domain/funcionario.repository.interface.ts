import { Funcionario } from './funcionario.entity';

export abstract class IFuncionarioRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<Funcionario[]>;
  abstract findById(id: string): Promise<Funcionario | null>;
  abstract findByEmail(assistenciaId: string, email: string): Promise<Funcionario | null>;
  abstract create(entity: Partial<Funcionario>): Promise<Funcionario>;
  abstract update(id: string, entity: Partial<Funcionario>): Promise<Funcionario>;
  abstract delete(id: string): Promise<void>;
}
