import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { modelos } from '../../../db/schemas/modelos.schema';
import { Modelo } from '../domain/modelo.entity';
import { IModeloRepository } from '../domain/modelo.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class ModeloPostgresRepository implements IModeloRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAll(): Promise<Modelo[]> {
    const rows = await this.db
      .select()
      .from(modelos);
    return rows as Modelo[];
  }

  async findById(id: string): Promise<Modelo | null> {
    const rows = await this.db
      .select()
      .from(modelos)
      .where(eq(modelos.id, id))
      .limit(1);
    return (rows[0] as Modelo) ?? null;
  }

  async create(entity: Partial<Modelo>): Promise<Modelo> {
    const { id, createdAt, updatedAt, ...insertData } = entity;
    const rows = await this.db
      .insert(modelos)
      .values(insertData as any)
      .returning();
    return rows[0] as Modelo;
  }

  async update(id: string, entity: Partial<Modelo>): Promise<Modelo> {
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = entity;
    const rows = await this.db
      .update(modelos)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(modelos.id, id))
      .returning();
    return rows[0] as Modelo;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(modelos).where(eq(modelos.id, id));
  }
}
