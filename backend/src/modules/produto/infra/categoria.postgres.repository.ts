import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { categorias } from '../../../db/schemas/produtos.schema';
import { Categoria } from '../domain/categoria.entity';
import { ICategoriaRepository } from '../domain/categoria.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class CategoriaPostgresRepository implements ICategoriaRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAllByAssistencia(assistenciaId: string): Promise<Categoria[]> {
    const rows = await this.db
      .select()
      .from(categorias)
      .where(eq(categorias.assistenciaId, assistenciaId));
    return rows as Categoria[];
  }

  async findById(id: string): Promise<Categoria | null> {
    const rows = await this.db
      .select()
      .from(categorias)
      .where(eq(categorias.id, id))
      .limit(1);
    return (rows[0] as Categoria) ?? null;
  }

  async create(entity: Partial<Categoria>): Promise<Categoria> {
    const { id, createdAt, updatedAt, ...insertData } = entity;
    const rows = await this.db
      .insert(categorias)
      .values(insertData as any)
      .returning();
    return rows[0] as Categoria;
  }

  async update(id: string, entity: Partial<Categoria>): Promise<Categoria> {
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = entity;
    const rows = await this.db
      .update(categorias)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(categorias.id, id))
      .returning();
    return rows[0] as Categoria;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(categorias).where(eq(categorias.id, id));
  }
}
