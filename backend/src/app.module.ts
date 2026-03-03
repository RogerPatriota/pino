import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { AssistenciaModule } from './modules/assistencia/assistencia.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { ModeloModule } from './modules/modelo/modelo.module';
import { LogAparelhoModule } from './modules/log-aparelho/log-aparelho.module';
import { ServicoModule } from './modules/servico/servico.module';
import { ClienteModule } from './modules/cliente/cliente.module';

@Module({
  imports: [
    DatabaseModule,
    AssistenciaModule,
    FuncionarioModule,
    ModeloModule,
    LogAparelhoModule,
    ServicoModule,
    ClienteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

