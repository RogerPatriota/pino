import { Module } from '@nestjs/common';
import { IAssistenciaRepository } from './domain/assistencia.repository.interface';
import { AssistenciaPostgresRepository } from './infra/assistencia.postgres.repository';
import { AssistenciaService } from './application/assistencia.service';
import { AssistenciaController } from './interface/assistencia.controller';

@Module({
  controllers: [AssistenciaController],
  providers: [
    {
      provide: IAssistenciaRepository,
      useClass: AssistenciaPostgresRepository,
    },
    AssistenciaService,
  ],
})
export class AssistenciaModule {}
