import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { logAparelhos } from '../../../db/schemas/modelos.schema';
import { LogAparelho } from '../domain/log-aparelho.entity';
import { ILogAparelhoRepository } from '../domain/log-aparelho.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class LogAparelhoPostgresRepository implements ILogAparelhoRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAllByAssistencia(assistenciaId: string): Promise<LogAparelho[]> {
    const rows = await this.db
      .select()
      .from(logAparelhos)
      .where(eq(logAparelhos.assistenciaId, assistenciaId));
    return rows as LogAparelho[];
  }

  async findById(id: string): Promise<LogAparelho | null> {
    const rows = await this.db
      .select()
      .from(logAparelhos)
      .where(eq(logAparelhos.id, id))
      .limit(1);
    return (rows[0] as LogAparelho) ?? null;
  }

  async create(entity: Partial<LogAparelho>): Promise<LogAparelho> {
    const { id, createdAt, updatedAt, ...insertData } = entity;
    const rows = await this.db
      .insert(logAparelhos)
      .values(insertData as any)
      .returning();
    return rows[0] as LogAparelho;
  }

  async update(id: string, entity: Partial<LogAparelho>): Promise<LogAparelho> {
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = entity;
    const rows = await this.db
      .update(logAparelhos)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(logAparelhos.id, id))
      .returning();
    return rows[0] as LogAparelho;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(logAparelhos).where(eq(logAparelhos.id, id));
  }
}
