import { Assistencia } from './assistencia.entity';

export abstract class IAssistenciaRepository {
  abstract findAll(): Promise<Assistencia[]>;
  abstract findById(id: string): Promise<Assistencia | null>;
  abstract create(entity: Assistencia): Promise<Assistencia>;
  abstract update(id: string, entity: Assistencia): Promise<Assistencia>;
  abstract delete(id: string): Promise<void>;
}
