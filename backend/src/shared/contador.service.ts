import { HttpException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_TOKEN } from '../db/database.module';
import { contadores } from '../db/schemas/contador.schema';

@Injectable()
export class ContadorService {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async initialize(assistenciaId: string, tx?: unknown) {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;
    const types = ['os', 'produto'];

    try {
      const payload = types.map((t) => ({ assistenciaId, tipo: t }));
      return await runner.insert(contadores).values(payload).returning();
    } catch (error) {
      console.error(`[ContadorService.initialize] assistenciaId: ${assistenciaId}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao inicializar contadores');
    }
  }

  async nextValue(assistenciaId: string, tipo: string, tx?: unknown): Promise<number> {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;

    try {
      const rows = await runner
        .update(contadores)
        .set({ ultimoValor: sql`${contadores.ultimoValor} + 1`, updatedAt: new Date() })
        .where(and(eq(contadores.assistenciaId, assistenciaId), eq(contadores.tipo, tipo)))
        .returning({ ultimoValor: contadores.ultimoValor });

      if (!rows.length) {
        throw new InternalServerErrorException(
          `Contador '${tipo}' não encontrado para a assistência ${assistenciaId}`,
        );
      }

      return rows[0].ultimoValor;
    } catch (error) {
      console.error(`[ContadorService.nextValue] assistenciaId: ${assistenciaId}, tipo: ${tipo}`, error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao gerar próximo valor do contador');
    }
  }
}
