
import { pgTable, uuid, varchar, text, numeric, timestamp, boolean } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';
import { modelos } from './modelos.schema';
import { integer } from 'drizzle-orm/pg-core';

export const servicos = pgTable('servicos', {
  id: uuid('id').defaultRandom().primaryKey(),
  assistenciaId: uuid('assistencia_id')
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
  
  nome: varchar({ length: 255 }).notNull(),
  descricao: text(),
  precoBase: numeric({ precision: 10, scale: 2 }).default('0.00'),
  modeloId: uuid().references(() => modelos.id),
  tempoEstimado: integer().default(0),
  ativo: boolean('ativo').default(true),
  
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

