import { Module } from '@nestjs/common';
import { ILogAparelhoRepository } from './domain/log-aparelho.repository.interface';
import { LogAparelhoPostgresRepository } from './infra/log-aparelho.postgres.repository';
import { LogAparelhoService } from './application/log-aparelho.service';
import { LogAparelhoController } from './interface/log-aparelho.controller';

@Module({
  controllers: [LogAparelhoController],
  providers: [
    {
      provide: ILogAparelhoRepository,
      useClass: LogAparelhoPostgresRepository,
    },
    LogAparelhoService,
  ],
  exports: [LogAparelhoService],
})
export class LogAparelhoModule {}
