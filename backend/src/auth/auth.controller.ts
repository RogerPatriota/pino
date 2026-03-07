import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './application/DTO/login.dto';
import { AuthService } from './application/auth.service';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiBody({type: LoginDto})
    async login(@Request() req: any) {
        return this.authService.login(req.user)
    }

}
