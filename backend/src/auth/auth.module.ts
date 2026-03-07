import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { FuncionarioModule } from 'src/modules/funcionario/funcionario.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    FuncionarioModule, 
    PassportModule,
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
