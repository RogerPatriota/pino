import { assistencias } from './assistencia.schema';
import { clientes } from './clientes.schema';
import { funcionarios } from './funcionarios.schema';
import { servicos } from './serviços.schema';
import { categorias, produtos } from './produtos.schema';
import { modelos, logAparelhos } from './modelos.schema';
import { contadores } from './contador.schema';
import { ordensServico, osServicos, osProdutos } from './os.schema';


import {
  assistenciaRelations,
  funcionariosRelations,
  clientesRelations,
  servicosRelations,
  produtosRelations,
  modelosRelations,
  logAparelhosRelations,
  contadoresRelations,
  ordensServicoRelations,
  osServicosRelations,
  osProdutosRelations,
} from './relations';



export const schemas = {
  assistencias,
  clientes,
  funcionarios,
  servicos,
  categorias,
  produtos,
  modelos,
  logAparelhos,
  contadores,
  ordensServico,
  osServicos,
  osProdutos,
  assistenciaRelations,
  funcionariosRelations,
  clientesRelations,
  servicosRelations,
  produtosRelations,
  modelosRelations,
  logAparelhosRelations,
  contadoresRelations,
  ordensServicoRelations,
  osServicosRelations,
  osProdutosRelations,
};

