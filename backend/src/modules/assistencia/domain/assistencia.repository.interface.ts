import { Assistencia } from './assistencia.entity';

export abstract class IAssistenciaRepository {
  abstract findAll(): Promise<Assistencia[]>;
  abstract findById(id: string): Promise<Assistencia | null>;
  abstract create(entity: Assistencia, tx?: unknown): Promise<Assistencia>;
  abstract update(id: string, entity: Assistencia): Promise<Assistencia>;
  abstract delete(id: string): Promise<void>;
  abstract transaction<T>(fn: (tx: unknown) => Promise<T>): Promise<T>;
}
