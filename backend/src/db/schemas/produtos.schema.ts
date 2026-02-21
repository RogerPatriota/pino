import { pgTable, uuid, varchar, text, numeric, timestamp, boolean, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';


export const condicaoPecaEnum = pgEnum('condicao_peca', ['novo', 'usado', 'retirado_original', 'recondicionado', 'com_detalhe']);
export const tipoEnum = pgEnum('tip', ['peça', 'acessorio']);

export const categorias = pgTable('categorias', {
  id: uuid().defaultRandom().primaryKey(),
  assistenciaId: uuid()
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),

  nome: varchar({ length: 100 }).notNull(),
  descricao: text(),
  exigeModelo: boolean().default(false),
  tipo: tipoEnum().default('peça').notNull(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const produtos = pgTable('produtos', {
  id: uuid().defaultRandom().primaryKey(),
  assistenciaId: uuid()
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
  categoriaId: uuid()
    .references(() => categorias.id)
    .notNull(),

  // modeloId: uuid().references(() => modelos.id), // Deixe comentado até criarmos a de modelos
  sku: varchar({ length: 100 }), 
  nomeCustomizado: varchar({ length: 255 }),
  marca: varchar({ length: 100 }),
  condicao: condicaoPecaEnum().default('novo').notNull(),
  precoCusto: numeric({ precision: 10, scale: 2 }).default('0.00'),
  
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}, (table) => [
  uniqueIndex('produtos_assistencia_sku_unique').on(table.assistenciaId, table.sku),
]);

