import { Injectable, Inject } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { estoqueMovimentacoes } from '../../../db/schemas/estoque.schema';
import { produtos } from '../../../db/schemas/produtos.schema';
import { Movimentacao } from '../domain/movimentacao.entity';
import { IEstoqueRepository } from '../domain/estoque.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class EstoquePostgresRepository implements IEstoqueRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async transaction<T>(fn: (tx: unknown) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => fn(tx));
  }

  async findAllByAssistencia(assistenciaId: string): Promise<Movimentacao[]> {
    const rows = await this.db
      .select()
      .from(estoqueMovimentacoes)
      .where(eq(estoqueMovimentacoes.assistenciaId, assistenciaId));
    return rows as unknown as Movimentacao[];
  }

  async findAllByProduto(produtoId: string): Promise<Movimentacao[]> {
    const rows = await this.db
      .select()
      .from(estoqueMovimentacoes)
      .where(eq(estoqueMovimentacoes.produtoId, produtoId));
    return rows as unknown as Movimentacao[];
  }

  async createMovimentacao(entity: Partial<Movimentacao>, tx?: unknown): Promise<Movimentacao> {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;
    const { id, createdAt, ...insertData } = entity as any;
    const rows = await runner
      .insert(estoqueMovimentacoes)
      .values(insertData)
      .returning();
    return rows[0] as unknown as Movimentacao;
  }

  async atualizarEstoqueProduto(produtoId: string, delta: number, tx?: unknown): Promise<void> {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;
    await runner
      .update(produtos)
      .set({
        quantidadeEstoque: sql`${produtos.quantidadeEstoque} + ${delta}`,
        updatedAt: new Date(),
      })
      .where(eq(produtos.id, produtoId));
  }
}
