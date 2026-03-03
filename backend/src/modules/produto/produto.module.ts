import { Module } from '@nestjs/common';
import { ICategoriaRepository } from './domain/categoria.repository.interface';
import { CategoriaPostgresRepository } from './infra/categoria.postgres.repository';
import { IProdutoRepository } from './domain/produto.repository.interface';
import { ProdutoPostgresRepository } from './infra/produto.postgres.repository';
import { CategoriaService } from './application/categoria.service';
import { ProdutoService } from './application/produto.service';
import { CategoriaController } from './interface/categoria.controller';
import { ProdutoController } from './interface/produto.controller';

@Module({
  controllers: [CategoriaController, ProdutoController],
  providers: [
    { provide: ICategoriaRepository, useClass: CategoriaPostgresRepository },
    { provide: IProdutoRepository, useClass: ProdutoPostgresRepository },
    CategoriaService,
    ProdutoService,
  ],
})
export class ProdutoModule {}
