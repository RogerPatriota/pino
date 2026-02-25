import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { AssistenciaModule } from './modules/assistencia/assistencia.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';

@Module({
  imports: [DatabaseModule, AssistenciaModule, FuncionarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
