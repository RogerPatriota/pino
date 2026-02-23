import { pgTable, uuid, varchar, integer, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';

export const contadores = pgTable('contadores', {
  id: uuid().defaultRandom().primaryKey(),
  assistenciaId: uuid()
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
  
  tipo: varchar({ length: 50 }).notNull(), 
  ultimoValor: integer().default(0).notNull(),

  updatedAt: timestamp().defaultNow().notNull(),
}, (table) => [
  uniqueIndex('assistencia_tipo_idx').on(table.assistenciaId, table.tipo),
]);
