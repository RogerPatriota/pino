import { Module } from '@nestjs/common';
import { IEstoqueRepository } from './domain/estoque.repository.interface';
import { EstoquePostgresRepository } from './infra/estoque.postgres.repository';
import { EstoqueService } from './application/estoque.service';
import { EstoqueController } from './interface/estoque.controller';

@Module({
  controllers: [EstoqueController],
  providers: [
    {
      provide: IEstoqueRepository,
      useClass: EstoquePostgresRepository,
    },
    EstoqueService,
  ],
})
export class EstoqueModule {}
