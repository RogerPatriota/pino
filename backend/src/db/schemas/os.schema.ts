import { pgTable, uuid, integer, numeric, timestamp, varchar, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { servicos } from './serviços.schema';
import { funcionarios } from './funcionarios.schema';
import { clientes } from './clientes.schema';
import { assistencias } from './assistencia.schema';
import { logAparelhos } from './modelos.schema';
import { produtos } from './produtos.schema';

export const osStatusEnum = pgEnum('os_status', [
  'orcamento', 
  'aprovado', 
  'em_manutencao', 
  'aguardando_peca', 
  'pronto', 
  'entregue', 
  'cancelado'
]);

export const osServicos = pgTable('os_servicos', {
  id: uuid().defaultRandom().primaryKey(),
  osId: uuid().references(() => ordensServico.id, { onDelete: 'cascade' }).notNull(),
  servicoId: uuid().references(() => servicos.id).notNull(),
  
  valorCobrado: numeric({ precision: 10, scale: 2 }).notNull(),
  quantidade: integer().default(1).notNull(),

  createdAt: timestamp().defaultNow().notNull(),
}, (table) => [
  uniqueIndex('os_servicos_os_servico_unique').on(table.osId, table.servicoId),
]);


export const osProdutos = pgTable('os_produtos', {
  id: uuid().defaultRandom().primaryKey(),
  osId: uuid().references(() => ordensServico.id, { onDelete: 'cascade' }).notNull(),
  produtoId: uuid().references(() => produtos.id).notNull(),
  
  valorCobrado: numeric({ precision: 10, scale: 2 }).notNull(),
  quantidade: integer().default(1).notNull(),

  createdAt: timestamp().defaultNow().notNull(),
}, (table) => [
  uniqueIndex('os_produtos_os_produto_unique').on(table.osId, table.produtoId),
]);

export const ordensServico = pgTable('ordens_servico', {
  id: uuid().defaultRandom().primaryKey(),
  assistenciaId: uuid().references(() => assistencias.id, { onDelete: 'cascade' }).notNull(),
  numeroOs: integer().notNull(), 
  
  clienteId: uuid().references(() => clientes.id).notNull(),
  aparelhoId: uuid().references(() => logAparelhos.id).notNull(),
  
  status: osStatusEnum().default('orcamento').notNull(),
  
  relatoCliente: varchar({ length: 255 }),
  laudoTecnico: varchar({ length: 255 }),
  observacoesInternas: varchar({ length: 255 }),
  funcionarioId: uuid().references(() => funcionarios.id),
  
  dataEntrada: timestamp().defaultNow().notNull(),
  dataInicioReparo: timestamp(),
  dataSaida: timestamp(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}, (table) => [
  uniqueIndex('numero_os_assistencia_idx').on(table.assistenciaId, table.numeroOs),
]);