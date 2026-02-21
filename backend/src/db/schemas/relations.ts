import { relations } from 'drizzle-orm';
import { assistencias } from './assistencia.schema';
import { funcionarios } from './funcionarios.schema';
import { clientes } from './clientes.schema';
import { servicos } from './serviços.schema';
import { categorias, produtos } from './produtos.schema';
import { modelos, logAparelhos } from './modelos.schema';

export const assistenciaRelations = relations(assistencias, ({ many }) => ({
  funcionarios: many(funcionarios),
  clientes: many(clientes),
  servicos: many(servicos),
  produtos: many(produtos),
  categorias: many(categorias),
  logAparelhos: many(logAparelhos),
}));

export const funcionariosRelations = relations(funcionarios, ({ one }) => ({
  assistencia: one(assistencias, {
    fields: [funcionarios.assistenciaId],
    references: [assistencias.id],
  }),
}));

export const clientesRelations = relations(clientes, ({ one, many }) => ({
  assistencia: one(assistencias, {
    fields: [clientes.assistenciaId],
    references: [assistencias.id],
  }),
  logAparelhos: many(logAparelhos),
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

export const modelosRelations = relations(modelos, ({ many }) => ({
  logAparelhos: many(logAparelhos),
}));


export const logAparelhosRelations = relations(logAparelhos, ({ one }) => ({
  assistencia: one(assistencias, {
    fields: [logAparelhos.assistenciaId],
    references: [assistencias.id],
  }),
  modelo: one(modelos, {
    fields: [logAparelhos.modeloId],
    references: [modelos.id],
  }),
  cliente: one(clientes, {
    fields: [logAparelhos.clienteId],
    references: [clientes.id],
  }),
}));

