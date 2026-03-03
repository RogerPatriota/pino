import { Module } from '@nestjs/common';
import { IClienteRepository } from './domain/cliente.repository.interface';
import { ClientePostgresRepository } from './infra/cliente.postgres.repository';
import { ClienteService } from './application/cliente.service';
import { ClienteController } from './interface/cliente.controller';

@Module({
  controllers: [ClienteController],
  providers: [
    {
      provide: IClienteRepository,
      useClass: ClientePostgresRepository,
    },
    ClienteService,
  ],
})
export class ClienteModule {}
