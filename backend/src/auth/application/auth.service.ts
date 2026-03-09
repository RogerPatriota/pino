import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { DB_TOKEN } from 'src/db/database.module';
import { funcionarios } from 'src/db/schemas/funcionarios.schema';
import { assistencias } from 'src/db/schemas/assistencia.schema';
import bcrypt from 'bcryptjs';
import { FuncionarioService } from 'src/modules/funcionario/application/funcionario.service';
import { AssistenciaService } from 'src/modules/assistencia/application/assistencia.service';
import { RegisterDto } from './DTO/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: FuncionarioService,
        private readonly assistenciaService: AssistenciaService,
        private readonly jwtService: JwtService,
        @Inject(DB_TOKEN) private readonly db: any
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

    async register(data: RegisterDto) {
        const assistencia = await this.assistenciaService.create(data.assistencia)
        if (!assistencia) {
            throw new Error('Erro ao criar assistência')
        }

        const user = await this.userService.create({
            assistenciaId: assistencia.id,
            ...data.funcionario
        })
        if (!user) {
            throw new Error('Erro ao criar usuário')
        }

        const token = await this.login(user)

        return token
    }

    async getProfile(userId: string) {
        const idToSearch = userId

        const data = await this.db.query.funcionarios.findFirst({
            where: (f, { eq }) => eq(f.id, idToSearch),
            with: {
                assistencia: true
            }
        });

        if (!data) {
            return null;
        }
        const { senha, ...funcionario } = data;

        return funcionario;
    }
}
