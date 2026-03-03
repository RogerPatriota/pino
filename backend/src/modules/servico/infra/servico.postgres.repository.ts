import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { servicos } from '../../../db/schemas/serviços.schema';
import { Servico } from '../domain/servico.entity';
import { IServicoRepository } from '../domain/servico.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class ServicoPostgresRepository implements IServicoRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAllByAssistencia(assistenciaId: string): Promise<Servico[]> {
    const rows = await this.db
      .select()
      .from(servicos)
      .where(eq(servicos.assistenciaId, assistenciaId));
    return rows as Servico[];
  }

  async findById(id: string): Promise<Servico | null> {
    const rows = await this.db
      .select()
      .from(servicos)
      .where(eq(servicos.id, id))
      .limit(1);
    return (rows[0] as Servico) ?? null;
  }

  async create(entity: Partial<Servico>): Promise<Servico> {
    const { id, createdAt, updatedAt, ...insertData } = entity;
    const rows = await this.db
      .insert(servicos)
      .values(insertData as any)
      .returning();
    return rows[0] as Servico;
  }

  async update(id: string, entity: Partial<Servico>): Promise<Servico> {
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = entity;
    const rows = await this.db
      .update(servicos)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(servicos.id, id))
      .returning();
    return rows[0] as Servico;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(servicos).where(eq(servicos.id, id));
  }
}
