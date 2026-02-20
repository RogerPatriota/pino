import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { funcionarios } from './funcionario.schema';

type AssistenciaConfig = {
    iaAtiva: boolean;
    notificarClienteAutomaticamente: boolean;
    especialidades: string[];
}

export const assistencias = pgTable('assistencias', {
    id: uuid('id').defaultRandom().primaryKey(),
    nome: varchar('nome', { length: 255 }).notNull(),
    logoUrl: text('logo_url'),
    cnpj: varchar('cnpj', { length: 18 }).unique(),
    telefone: varchar('telefone', { length: 20 }).notNull(),
    endereco: text('endereco'),
  
    promptCustomizado: text('prompt_customizado'), 
    configuracoes: jsonb('configuracoes').$type<AssistenciaConfig>().default({
        iaAtiva: true,
        notificarClienteAutomaticamente: true,
        especialidades: []
    }),
  
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const AssistenciaRelations = relations(assistencias, ({ many }) => ({
    funcionarios: many(funcionarios)
}))