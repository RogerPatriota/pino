import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { FuncionarioModule } from 'src/modules/funcionario/funcionario.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AssistenciaModule } from 'src/modules/assistencia/assistencia.module';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [
    FuncionarioModule, 
    AssistenciaModule,
    PassportModule,
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_TOKEN,
        signOptions: { expiresIn: '120s' },
      }),
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
