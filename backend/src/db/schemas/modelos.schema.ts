import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';
import { clientes } from './clientes.schema';

export const modelos = pgTable('modelos', {
  id: uuid().defaultRandom().primaryKey(),
  assistenciaId: uuid()
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
  
  marca: varchar({ length: 100 }).notNull(),
  nomeComercial: varchar({ length: 255 }).notNull(),
  modeloTecnico: varchar({ length: 100 }),
  anoLancamento: integer(),
  
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const logAparelhos = pgTable('log_aparelhos', {
  id: uuid().defaultRandom().primaryKey(),
  assistenciaId: uuid()
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
    
  modeloId: uuid()
    .references(() => modelos.id)
    .notNull(),
    
  clienteId: uuid()
    .references(() => clientes.id, { onDelete: 'cascade' })
    .notNull(),

  serialImei: varchar({ length: 100 }).notNull(), 
  cor: varchar({ length: 50 }),
  observacoesFisicas: varchar({ length: 255 }),
  senha: varchar({ length: 255 }),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});