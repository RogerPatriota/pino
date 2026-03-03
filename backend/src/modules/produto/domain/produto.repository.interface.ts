import { Produto } from './produto.entity';

export abstract class IProdutoRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<Produto[]>;
  abstract findById(id: string): Promise<Produto | null>;
  abstract create(entity: Partial<Produto>): Promise<Produto>;
  abstract update(id: string, entity: Partial<Produto>): Promise<Produto>;
  abstract delete(id: string): Promise<void>;
}
