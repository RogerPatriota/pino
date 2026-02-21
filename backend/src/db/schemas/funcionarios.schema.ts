import { pgTable, uuid, varchar, text, timestamp, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';


export const roleEnum = pgEnum('role', ['dono', 'admin', 'tecnico', 'atendente']);

export const funcionarios = pgTable('funcionarios', {
  id: uuid('id').defaultRandom().primaryKey(),
  assistenciaId: uuid('assistencia_id')
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),

  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  senha: text().notNull(),

  numero: varchar({ length: 20 }),
  role: roleEnum().default('tecnico').notNull(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}, (table) => [
  uniqueIndex('funcionarios_assistencia_email_unique').on(table.assistenciaId, table.email),
  uniqueIndex('funcionarios_assistencia_numero_unique').on(table.assistenciaId, table.numero),
]);
