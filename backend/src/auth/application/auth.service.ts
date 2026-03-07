import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { FuncionarioService } from 'src/modules/funcionario/application/funcionario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: FuncionarioService,
        private readonly jwtService: JwtService    
    ) {}

    async validateUser(email: string, password: string, assistencia_id: string) {
        const user = await this.userService.findByEmail(assistencia_id, email);
        if (!user) return null;

        if (await bcrypt.compare(password, user.senha)){
            const {senha, ...result} = user
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, assistenciaId: user.assistenciaId, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
