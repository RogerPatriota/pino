import { pgTable, uuid, integer, varchar, timestamp, text, pgEnum, numeric } from 'drizzle-orm/pg-core';
import { assistencias } from './assistencia.schema';
import { produtos } from './produtos.schema';
import { funcionarios } from './funcionarios.schema';

export const tipoMovimentacaoEnum = pgEnum('tipo_movimentacao', [
  'entrada',
  'saida_venda',
  'ajuste_manual',
  'devolucao'
]);

export const estoqueMovimentacoes = pgTable('estoque_movimentacoes', {
    id: uuid().defaultRandom().primaryKey(),
    assistenciaId: uuid()
    .references(() => assistencias.id, { onDelete: 'cascade' })
    .notNull(),
    
    produtoId: uuid()
    .references(() => produtos.id, { onDelete: 'cascade' })
    .notNull(),
    
    funcionarioId: uuid()
    .references(() => funcionarios.id)
    .notNull(),

    tipo: tipoMovimentacaoEnum().notNull(),
    quantidade: integer().notNull(),
    precoCusto: numeric({ precision: 10, scale: 2 }).default('0.00'),
    motivo: text(),

    createdAt: timestamp().defaultNow().notNull(),
}, (table) => []);