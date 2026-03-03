import { Global, Module } from '@nestjs/common';
import { ContadorService } from './contador.service';

@Global()
@Module({
  providers: [ContadorService],
  exports: [ContadorService],
})
export class SharedModule {}
