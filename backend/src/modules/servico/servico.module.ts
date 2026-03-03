import { Module } from '@nestjs/common';
import { IServicoRepository } from './domain/servico.repository.interface';
import { ServicoPostgresRepository } from './infra/servico.postgres.repository';
import { ServicoService } from './application/servico.service';
import { ServicoController } from './interface/servico.controller';

@Module({
  controllers: [ServicoController],
  providers: [
    {
      provide: IServicoRepository,
      useClass: ServicoPostgresRepository,
    },
    ServicoService,
  ],
})
export class ServicoModule {}
