import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';

export const roleEnum = pgEnum('role', ['owner', 'admin', 'tecnico', 'recepcionista']);

export const funcionarios = pgTable('funcionarios', {
  id: uuid('id').defaultRandom().primaryKey(),
  assistenciaId: uuid('assistencia_id')
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
  
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  senha: text().notNull(),

  numero: varchar({ length: 20 }).unique(), 
  role: roleEnum().default('tecnico').notNull(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

