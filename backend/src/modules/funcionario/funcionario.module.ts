import { Module } from '@nestjs/common';
import { IFuncionarioRepository } from './domain/funcionario.repository.interface';
import { FuncionarioPostgresRepository } from './infra/funcionario.postgres.repository';
import { FuncionarioService } from './application/funcionario.service';
import { FuncionarioController } from './interface/funcionario.controller';

@Module({
  controllers: [FuncionarioController],
  providers: [
    {
      provide: IFuncionarioRepository,
      useClass: FuncionarioPostgresRepository,
    },
    FuncionarioService,
  ],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
