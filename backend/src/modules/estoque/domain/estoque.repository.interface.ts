import { Movimentacao } from './movimentacao.entity';

export abstract class IEstoqueRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<Movimentacao[]>;
  abstract findAllByProduto(produtoId: string): Promise<Movimentacao[]>;
  abstract createMovimentacao(entity: Partial<Movimentacao>, tx?: unknown): Promise<Movimentacao>;
  abstract atualizarEstoqueProduto(produtoId: string, delta: number, tx?: unknown): Promise<void>;
  abstract transaction<T>(fn: (tx: unknown) => Promise<T>): Promise<T>;
}
