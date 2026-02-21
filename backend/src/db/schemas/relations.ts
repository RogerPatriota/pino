import { relations } from 'drizzle-orm';
import { assistencias } from './assistencia.schema';
import { funcionarios } from './funcionario.schema';
import { clientes } from './cliente.schema';
import { servicos } from './serviços.schema';
import { categorias, produtos } from './produtos.schema';

export const assistenciaRelations = relations(assistencias, ({ many }) => ({
  funcionarios: many(funcionarios),
  clientes: many(clientes),
  servicos: many(servicos),
  produtos: many(produtos),
  categorias: many(categorias),
}));

export const funcionariosRelations = relations(funcionarios, ({ one }) => ({
  assistencia: one(assistencias, {
    fields: [funcionarios.assistenciaId],
    references: [assistencias.id],
  }),
}));

export const clientesRelations = relations(clientes, ({ one }) => ({
  assistencia: one(assistencias, {
    fields: [clientes.assistenciaId],
    references: [assistencias.id],
  }),
}));

export const servicosRelations = relations(servicos, ({ one }) => ({
  assistencia: one(assistencias, {
    fields: [servicos.assistenciaId],
    references: [assistencias.id],
  }),
}));

export const produtosRelations = relations(produtos, ({ one }) => ({
  assistencia: one(assistencias, {
    fields: [produtos.assistenciaId],
    references: [assistencias.id],
  }),
  categoria: one(categorias, {
    fields: [produtos.categoriaId],
    references: [categorias.id],
  }),
}));
