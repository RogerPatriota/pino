import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { SharedModule } from './shared/shared.module';
import { AssistenciaModule } from './modules/assistencia/assistencia.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { ModeloModule } from './modules/modelo/modelo.module';
import { LogAparelhoModule } from './modules/log-aparelho/log-aparelho.module';
import { ServicoModule } from './modules/servico/servico.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ProdutoModule } from './modules/produto/produto.module';

@Module({
  imports: [
    DatabaseModule,
    SharedModule,
    AssistenciaModule,
    FuncionarioModule,
    ModeloModule,
    LogAparelhoModule,
    ServicoModule,
    ClienteModule,
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


