import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ description: 'Email do funcionário', example: 'joao@assistencia.com' })
    email: string;
    @ApiProperty({ description: 'Senha do funcionário', example: 'senhaSegura123' })
    password: string;
    @ApiProperty({ description: 'UUID da assistência', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
    assistenciaId: string;
}