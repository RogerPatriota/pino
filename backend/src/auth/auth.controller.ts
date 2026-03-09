import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './application/DTO/login.dto';
import { AuthService } from './application/auth.service';
import { RegisterDto } from './application/DTO/register.dto';
import { CurrentUser } from './decorators/current-user.decorator';

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

    @Post('register')
    @ApiBody({type: RegisterDto})
    async register(@Body() data: RegisterDto) {
        return this.authService.register(data)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('identify')
    @ApiOperation({ summary: 'Identifica o usuário logado' })
    @ApiResponse({ status: 200, description: 'Usuário identificado com sucesso' })
    async identify(@CurrentUser() user: any) {
        return this.authService.getProfile(user.userId)
    }

}
