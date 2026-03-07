import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../application/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email', passReqToCallback: true })
    }

    async validate(req: any, email: string, password: string): Promise<any> {
        const assistencia_id = req.body.assistenciaId
        if (!assistencia_id) {
            throw new UnauthorizedException('Identificador da assistência faltando')
        }
        const user = await this.authService.validateUser(email, password, assistencia_id)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
