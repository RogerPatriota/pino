import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { produtos } from '../../../db/schemas/produtos.schema';
import { Produto } from '../domain/produto.entity';
import { IProdutoRepository } from '../domain/produto.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class ProdutoPostgresRepository implements IProdutoRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAllByAssistencia(assistenciaId: string): Promise<Produto[]> {
    const rows = await this.db
      .select()
      .from(produtos)
      .where(eq(produtos.assistenciaId, assistenciaId));
    return rows as Produto[];
  }

  async findById(id: string): Promise<Produto | null> {
    const rows = await this.db
      .select()
      .from(produtos)
      .where(eq(produtos.id, id))
      .limit(1);
    return (rows[0] as Produto) ?? null;
  }

  async create(entity: Partial<Produto>): Promise<Produto> {
    const { id, createdAt, updatedAt, ...insertData } = entity;
    const rows = await this.db
      .insert(produtos)
      .values(insertData as any)
      .returning();
    return rows[0] as Produto;
  }

  async update(id: string, entity: Partial<Produto>): Promise<Produto> {
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = entity;
    const rows = await this.db
      .update(produtos)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(produtos.id, id))
      .returning();
    return rows[0] as Produto;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(produtos).where(eq(produtos.id, id));
  }
}
