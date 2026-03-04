import { OrdemServico } from './os.entity';
import { OsProduto } from './os-produto.entity';
import { OsServico } from './os-servico.entity';

export type OsFiltros = {
  status?: string;
  clienteId?: string;
};

export type OsDetalhe = OrdemServico & {
  produtos: OsProduto[];
  servicos: OsServico[];
};

export abstract class IOsRepository {
  abstract create(entity: Partial<OrdemServico>, tx?: unknown): Promise<OrdemServico>;
  abstract findAllByAssistencia(assistenciaId: string, filtros?: OsFiltros): Promise<OrdemServico[]>;
  abstract findById(id: string, assistenciaId: string): Promise<OsDetalhe | null>;
  abstract updateStatus(id: string, status: string): Promise<OrdemServico>;
  abstract addProduto(entity: Partial<OsProduto>, tx?: unknown): Promise<OsProduto>;
  abstract addServico(entity: Partial<OsServico>, tx?: unknown): Promise<OsServico>;
  abstract recalcularValorTotal(osId: string, tx?: unknown): Promise<string>;
  abstract findProdutoPreco(produtoId: string): Promise<string | null>;
  abstract findServicoPreco(servicoId: string): Promise<string | null>;
  abstract transaction<T>(fn: (tx: unknown) => Promise<T>): Promise<T>;
}
