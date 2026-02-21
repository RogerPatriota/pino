import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';

export const clientes = pgTable('clientes', {
  id: uuid('id').defaultRandom().primaryKey(),
  assistenciaId: uuid('assistencia_id')
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
  
  nome: varchar({ length: 255 }).notNull(),
  numero: varchar({ length: 20 }),
  cpfCnpj: varchar({ length: 20 }),
  endereco: text(),
  observacoes: text(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

