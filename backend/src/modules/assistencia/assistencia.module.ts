import { Module } from '@nestjs/common';
import { IAssistenciaRepository } from './domain/assistencia.repository.interface';
import { AssistenciaPostgresRepository } from './infra/assistencia.postgres.repository';
import { AssistenciaService } from './application/assistencia.service';
import { AssistenciaController } from './interface/assistencia.controller';
import { ContadorService } from './application/contador.service';

@Module({
  controllers: [AssistenciaController],
  providers: [
    {
      provide: IAssistenciaRepository,
      useClass: AssistenciaPostgresRepository,
    },
    AssistenciaService,
    ContadorService
  ],
})
export class AssistenciaModule {}
