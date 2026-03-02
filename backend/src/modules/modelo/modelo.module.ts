import { Module } from '@nestjs/common';
import { IModeloRepository } from './domain/modelo.repository.interface';
import { ModeloPostgresRepository } from './infra/modelo.postgres.repository';
import { ModeloService } from './application/modelo.service';
import { ModeloController } from './interface/modelo.controller';

@Module({
  controllers: [ModeloController],
  providers: [
    {
      provide: IModeloRepository,
      useClass: ModeloPostgresRepository,
    },
    ModeloService,
  ],
})
export class ModeloModule {}
