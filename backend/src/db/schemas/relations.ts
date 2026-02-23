import { relations } from 'drizzle-orm';
import { assistencias } from './assistencia.schema';
import { funcionarios } from './funcionarios.schema';
import { clientes } from './clientes.schema';
import { servicos } from './serviços.schema';
import { categorias, produtos } from './produtos.schema';
import { modelos, logAparelhos } from './modelos.schema';
import { contadores } from './contador.schema';
import { ordensServico, osServicos, osProdutos } from './os.schema';



export const assistenciaRelations = relations(assistencias, ({ many }) => ({
  funcionarios: many(funcionarios),
  clientes: many(clientes),
  servicos: many(servicos),
  produtos: many(produtos),
  categorias: many(categorias),
  logAparelhos: many(logAparelhos),
  contadores: many(contadores),
  ordensServico: many(ordensServico),
}));



export const funcionariosRelations = relations(funcionarios, ({ one, many }) => ({
  assistencia: one(assistencias, {
    fields: [funcionarios.assistenciaId],
    references: [assistencias.id],
  }),
  ordensServico: many(ordensServico),
}));



export const clientesRelations = relations(clientes, ({ one, many }) => ({
  assistencia: one(assistencias, {
    fields: [clientes.assistenciaId],
    references: [assistencias.id],
  }),
  logAparelhos: many(logAparelhos),
  ordensServico: many(ordensServico),
}));


export const servicosRelations = relations(servicos, ({ one, many }) => ({
  assistencia: one(assistencias, {
    fields: [servicos.assistenciaId],
    references: [assistencias.id],
  }),
  osServicos: many(osServicos),
}));



export const produtosRelations = relations(produtos, ({ one, many }) => ({
  assistencia: one(assistencias, {
    fields: [produtos.assistenciaId],
    references: [assistencias.id],
  }),
  categoria: one(categorias, {
    fields: [produtos.categoriaId],
    references: [categorias.id],
  }),
  osProdutos: many(osProdutos),
}));



export const modelosRelations = relations(modelos, ({ many }) => ({
  logAparelhos: many(logAparelhos),
}));



export const logAparelhosRelations = relations(logAparelhos, ({ one, many }) => ({
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
  ordensServico: many(ordensServico),
}));



export const contadoresRelations = relations(contadores, ({ one }) => ({
  assistencia: one(assistencias, {
    fields: [contadores.assistenciaId],
    references: [assistencias.id],
  }),
}));

export const ordensServicoRelations = relations(ordensServico, ({ one, many }) => ({
  assistencia: one(assistencias, {
    fields: [ordensServico.assistenciaId],
    references: [assistencias.id],
  }),
  cliente: one(clientes, {
    fields: [ordensServico.clienteId],
    references: [clientes.id],
  }),
  aparelho: one(logAparelhos, {
    fields: [ordensServico.aparelhoId],
    references: [logAparelhos.id],
  }),
  funcionario: one(funcionarios, {
    fields: [ordensServico.funcionarioId],
    references: [funcionarios.id],
  }),
  servicos: many(osServicos),
  produtos: many(osProdutos),
}));

export const osServicosRelations = relations(osServicos, ({ one }) => ({
  os: one(ordensServico, {
    fields: [osServicos.osId],
    references: [ordensServico.id],
  }),
  servico: one(servicos, {
    fields: [osServicos.servicoId],
    references: [servicos.id],
  }),
}));

export const osProdutosRelations = relations(osProdutos, ({ one }) => ({
  os: one(ordensServico, {
    fields: [osProdutos.osId],
    references: [ordensServico.id],
  }),
  produto: one(produtos, {
    fields: [osProdutos.produtoId],
    references: [produtos.id],
  }),
}));



