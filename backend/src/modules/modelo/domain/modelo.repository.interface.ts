import { Modelo } from './modelo.entity';

export abstract class IModeloRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<Modelo[]>;
  abstract findById(id: string): Promise<Modelo | null>;
  abstract create(entity: Partial<Modelo>): Promise<Modelo>;
  abstract update(id: string, entity: Partial<Modelo>): Promise<Modelo>;
  abstract delete(id: string): Promise<void>;
}
