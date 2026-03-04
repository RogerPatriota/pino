import { Injectable, Inject } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_TOKEN } from '../../../db/database.module';
import { ordensServico, osProdutos, osServicos } from '../../../db/schemas/os.schema';
import { produtos } from '../../../db/schemas/produtos.schema';
import { servicos } from '../../../db/schemas/serviços.schema';
import { OrdemServico } from '../domain/os.entity';
import { OsProduto } from '../domain/os-produto.entity';
import { OsServico } from '../domain/os-servico.entity';
import { IOsRepository, OsDetalhe, OsFiltros } from '../domain/os.repository.interface';

@Injectable()
export class OsPostgresRepository implements IOsRepository {
  constructor(
    @Inject(DB_TOKEN)
    private readonly db: NodePgDatabase<any>,
  ) {}

  async transaction<T>(fn: (tx: unknown) => Promise<T>): Promise<T> {
    return this.db.transaction(async (tx) => fn(tx));
  }

  async create(entity: Partial<OrdemServico>, tx?: unknown): Promise<OrdemServico> {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;
    const { id, createdAt, updatedAt, dataEntrada, ...insertData } = entity as any;
    const rows = await runner
      .insert(ordensServico)
      .values(insertData)
      .returning();
    return rows[0] as OrdemServico;
  }

  async findAllByAssistencia(assistenciaId: string, filtros?: OsFiltros): Promise<OrdemServico[]> {
    const conditions = [eq(ordensServico.assistenciaId, assistenciaId)];

    if (filtros?.status) {
      conditions.push(eq(ordensServico.status, filtros.status as any));
    }
    if (filtros?.clienteId) {
      conditions.push(eq(ordensServico.clienteId, filtros.clienteId));
    }

    const rows = await this.db
      .select()
      .from(ordensServico)
      .where(and(...conditions))
      .orderBy(ordensServico.createdAt);

    return rows as OrdemServico[];
  }

  async findById(id: string, assistenciaId: string): Promise<OsDetalhe | null> {
    const osRows = await this.db
      .select()
      .from(ordensServico)
      .where(and(eq(ordensServico.id, id), eq(ordensServico.assistenciaId, assistenciaId)))
      .limit(1);

    if (!osRows.length) return null;

    const os = osRows[0] as OrdemServico;

    const produtosRows = await this.db
      .select()
      .from(osProdutos)
      .where(eq(osProdutos.osId, id));

    const servicosRows = await this.db
      .select()
      .from(osServicos)
      .where(eq(osServicos.osId, id));

    return {
      ...os,
      produtos: produtosRows as OsProduto[],
      servicos: servicosRows as OsServico[],
    };
  }

  async updateStatus(id: string, status: string): Promise<OrdemServico> {
    const rows = await this.db
      .update(ordensServico)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(ordensServico.id, id))
      .returning();
    return rows[0] as OrdemServico;
  }

  async addProduto(entity: Partial<OsProduto>, tx?: unknown): Promise<OsProduto> {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;
    const { id, createdAt, ...insertData } = entity as any;
    const rows = await runner
      .insert(osProdutos)
      .values(insertData)
      .returning();
    return rows[0] as OsProduto;
  }

  async addServico(entity: Partial<OsServico>, tx?: unknown): Promise<OsServico> {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;
    const { id, createdAt, ...insertData } = entity as any;
    const rows = await runner
      .insert(osServicos)
      .values(insertData)
      .returning();
    return rows[0] as OsServico;
  }

  async recalcularValorTotal(osId: string, tx?: unknown): Promise<string> {
    const runner = (tx ?? this.db) as NodePgDatabase<any>;

    // Soma os_produtos: SUM(preco_venda * quantidade)
    const totalProdutosResult = await runner
      .select({
        total: sql<string>`COALESCE(SUM(${osProdutos.precoVenda}::numeric * ${osProdutos.quantidade}), 0)`,
      })
      .from(osProdutos)
      .where(eq(osProdutos.osId, osId));

    // Soma os_servicos: SUM(valor_cobrado * quantidade)
    const totalServicosResult = await runner
      .select({
        total: sql<string>`COALESCE(SUM(${osServicos.valorCobrado}::numeric * ${osServicos.quantidade}), 0)`,
      })
      .from(osServicos)
      .where(eq(osServicos.osId, osId));

    const totalProdutos = parseFloat(totalProdutosResult[0]?.total ?? '0');
    const totalServicos = parseFloat(totalServicosResult[0]?.total ?? '0');
    const valorTotal = (totalProdutos + totalServicos).toFixed(2);

    await runner
      .update(ordensServico)
      .set({ valorTotal, updatedAt: new Date() })
      .where(eq(ordensServico.id, osId));

    return valorTotal;
  }

  async findProdutoPreco(produtoId: string): Promise<string | null> {
    const rows = await this.db
      .select({ precoVenda: produtos.precoVenda })
      .from(produtos)
      .where(eq(produtos.id, produtoId))
      .limit(1);
    return rows[0]?.precoVenda ?? null;
  }

  async findServicoPreco(servicoId: string): Promise<string | null> {
    const rows = await this.db
      .select({ precoBase: servicos.precoBase })
      .from(servicos)
      .where(eq(servicos.id, servicoId))
      .limit(1);
    return rows[0]?.precoBase ?? null;
  }
}
