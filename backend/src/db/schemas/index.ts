import { assistencias } from './assistencia.schema';
import { clientes } from './cliente.schema';
import { funcionarios } from './funcionario.schema';
import { servicos } from './serviços.schema';
import { categorias, produtos } from './produtos.schema';
import {
  assistenciaRelations,
  funcionariosRelations,
  clientesRelations,
  servicosRelations,
  produtosRelations,
} from './relations';

export const schemas = {
  assistencias,
  clientes,
  funcionarios,
  servicos,
  categorias,
  produtos,
  assistenciaRelations,
  funcionariosRelations,
  clientesRelations,
  servicosRelations,
  produtosRelations,
};