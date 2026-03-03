import { Categoria } from './categoria.entity';

export abstract class ICategoriaRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<Categoria[]>;
  abstract findById(id: string): Promise<Categoria | null>;
  abstract create(entity: Partial<Categoria>): Promise<Categoria>;
  abstract update(id: string, entity: Partial<Categoria>): Promise<Categoria>;
  abstract delete(id: string): Promise<void>;
}
