import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { assistencias } from '../../../db/schemas/assistencia.schema';
import { Assistencia } from '../domain/assistencia.entity';
import { IAssistenciaRepository } from '../domain/assistencia.repository.interface';
import { CreateAssistenciaDto } from '../application/dto/create-assistencia.dto';
import { UpdateAssistenciaDto } from '../application/dto/update-assistencia.dto';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class AssistenciaPostgresRepository implements IAssistenciaRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAll(): Promise<Assistencia[]> {
    const rows = await this.db.select().from(assistencias);
    return rows as Assistencia[];
  }

  async findById(id: string): Promise<Assistencia | null> {
    const rows = await this.db
      .select()
      .from(assistencias)
      .where(eq(assistencias.id, id))
      .limit(1);
    return (rows[0] as Assistencia) ?? null;
  }

  async create(data: CreateAssistenciaDto): Promise<Assistencia> {
    const rows = await this.db
      .insert(assistencias)
      .values(data)
      .returning();
    return rows[0] as Assistencia;
  }

  async update(id: string, data: UpdateAssistenciaDto): Promise<Assistencia> {
    const rows = await this.db
      .update(assistencias)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(assistencias.id, id))
      .returning();
    return rows[0] as Assistencia;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(assistencias).where(eq(assistencias.id, id));
  }
}
