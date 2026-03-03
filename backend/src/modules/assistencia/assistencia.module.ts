import { Module } from '@nestjs/common';
import { IAssistenciaRepository } from './domain/assistencia.repository.interface';
import { AssistenciaPostgresRepository } from './infra/assistencia.postgres.repository';
import { AssistenciaService } from './application/assistencia.service';
import { AssistenciaController } from './interface/assistencia.controller';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
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

