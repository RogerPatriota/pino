import { Injectable, Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { funcionarios } from '../../../db/schemas/funcionarios.schema';
import { Funcionario } from '../domain/funcionario.entity';
import { IFuncionarioRepository } from '../domain/funcionario.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class FuncionarioPostgresRepository implements IFuncionarioRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAllByAssistencia(assistenciaId: string): Promise<Funcionario[]> {
    const rows = await this.db
      .select()
      .from(funcionarios)
      .where(eq(funcionarios.assistenciaId, assistenciaId));
    return rows as Funcionario[];
  }

  async findById(id: string): Promise<Funcionario | null> {
    const rows = await this.db
      .select()
      .from(funcionarios)
      .where(eq(funcionarios.id, id))
      .limit(1);
    return (rows[0] as Funcionario) ?? null;
  }

  async findByEmail(assistenciaId: string, email: string): Promise<Funcionario | null> {
    const rows = await this.db
      .select()
      .from(funcionarios)
      .where(
        and(
          eq(funcionarios.assistenciaId, assistenciaId),
          eq(funcionarios.email, email),
        ),
      )
      .limit(1);
    return (rows[0] as Funcionario) ?? null;
  }

  async create(entity: Partial<Funcionario>): Promise<Funcionario> {
    const { id, createdAt, updatedAt, ...insertData } = entity;
    const rows = await this.db
      .insert(funcionarios)
      .values(insertData as any)
      .returning();
    return rows[0] as Funcionario;
  }

  async update(id: string, entity: Partial<Funcionario>): Promise<Funcionario> {
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = entity;
    const rows = await this.db
      .update(funcionarios)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(funcionarios.id, id))
      .returning();
    return rows[0] as Funcionario;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(funcionarios).where(eq(funcionarios.id, id));
  }
}
