import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_TOKEN } from "../../../db/database.module";
import { contadores } from "../../../db/schemas/contador.schema";

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
            const payload = types.map(t => ({
                assistenciaId,
                tipo: t,
            }));

            return await runner.insert(contadores).values(payload).returning();
        } catch (error) {
            console.error(`[ContadorService.initialize] ID: ${assistenciaId}`, error);

            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Erro ao iniciar contadores');
        }
    }
}