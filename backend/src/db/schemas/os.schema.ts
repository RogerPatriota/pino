import { pgTable, uuid, integer, numeric, timestamp, varchar, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { servicos } from './serviços.schema';
import { funcionarios } from './funcionarios.schema';
import { clientes } from './clientes.schema';
import { assistencias } from './assistencia.schema';
import { logAparelhos } from './modelos.schema';

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
  id: uuid('id').defaultRandom().primaryKey(),
  osId: uuid('os_id').references(() => ordensServico.id, { onDelete: 'cascade' }).notNull(),
  servicoId: uuid('servico_id').references(() => servicos.id).notNull(),
  
  valorCobrado: numeric('valor_cobrado', { precision: 10, scale: 2 }).notNull(),
  quantidade: integer('quantidade').default(1).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const ordensServico = pgTable('ordens_servico', {
  id: uuid('id').defaultRandom().primaryKey(),
  assistenciaId: uuid('assistencia_id').references(() => assistencias.id, { onDelete: 'cascade' }).notNull(),
  numeroOs: integer('numero_os').notNull(), 
  
  clienteId: uuid('cliente_id').references(() => clientes.id).notNull(),
  aparelhoId: uuid('aparelho_id').references(() => logAparelhos.id).notNull(),
  
  status: osStatusEnum('status').default('orcamento').notNull(),
  
  relatoCliente: varchar('relato_cliente', { length: 255 }),
  laudoTecnico: varchar('laudo_tecnico', { length: 255 }),
  observacoesInternas: varchar('observacoes_internas', { length: 255 }),
  funcionarioId: uuid('funcionario_id').references(() => funcionarios.id),
  
  dataEntrada: timestamp('data_entrada').defaultNow().notNull(),
  dataInicioReparo: timestamp('data_inicio_reparo'),
  dataSaida: timestamp('data_saida'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('numero_os_assistencia_idx').on(table.assistenciaId, table.numeroOs),
]);