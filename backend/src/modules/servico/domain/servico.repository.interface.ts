import { Servico } from './servico.entity';

export abstract class IServicoRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<Servico[]>;
  abstract findById(id: string): Promise<Servico | null>;
  abstract create(entity: Partial<Servico>): Promise<Servico>;
  abstract update(id: string, entity: Partial<Servico>): Promise<Servico>;
  abstract delete(id: string): Promise<void>;
}
