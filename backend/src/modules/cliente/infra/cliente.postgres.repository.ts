import { Injectable, Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { clientes } from '../../../db/schemas/clientes.schema';
import { Cliente } from '../domain/cliente.entity';
import { IClienteRepository } from '../domain/cliente.repository.interface';
import { DB_TOKEN } from '../../../db/database.module';

@Injectable()
export class ClientePostgresRepository implements IClienteRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async findAllByAssistencia(assistenciaId: string): Promise<Cliente[]> {
    const rows = await this.db
      .select()
      .from(clientes)
      .where(eq(clientes.assistenciaId, assistenciaId));
    return rows as Cliente[];
  }

  async findById(id: string): Promise<Cliente | null> {
    const rows = await this.db
      .select()
      .from(clientes)
      .where(eq(clientes.id, id))
      .limit(1);
    return (rows[0] as Cliente) ?? null;
  }

  async findByCpfCnpj(assistenciaId: string, cpfCnpj: string): Promise<Cliente | null> {
    const rows = await this.db
      .select()
      .from(clientes)
      .where(
        and(
          eq(clientes.assistenciaId, assistenciaId),
          eq(clientes.cpfCnpj, cpfCnpj),
        ),
      )
      .limit(1);
    return (rows[0] as Cliente) ?? null;
  }

  async create(entity: Partial<Cliente>): Promise<Cliente> {
    const { id, createdAt, updatedAt, ...insertData } = entity;
    const rows = await this.db
      .insert(clientes)
      .values(insertData as any)
      .returning();
    return rows[0] as Cliente;
  }

  async update(id: string, entity: Partial<Cliente>): Promise<Cliente> {
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = entity;
    const rows = await this.db
      .update(clientes)
      .set({ ...updateData, updatedAt: new Date() } as any)
      .where(eq(clientes.id, id))
      .returning();
    return rows[0] as Cliente;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(clientes).where(eq(clientes.id, id));
  }
}
