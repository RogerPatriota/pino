import { BadRequestException } from '@nestjs/common';

export type FuncionarioRole = 'dono' | 'admin' | 'tecnico' | 'atendente';

const ROLES_VALIDOS: FuncionarioRole[] = ['dono', 'admin', 'tecnico', 'atendente'];

type FuncionarioProps = {
  assistenciaId: string;
  nome: string;
  email: string;
  senha: string;
  numero?: string | null;
  role?: FuncionarioRole;
};

export class Funcionario {
  id: string;
  assistenciaId: string;
  nome: string;
  email: string;
  senha: string;
  numero: string | null;
  role: FuncionarioRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: FuncionarioProps) {
    if (!Funcionario.validarEmail(props.email)) {
      throw new BadRequestException(`Email inválido: ${props.email}`);
    }

    if (props.role && !ROLES_VALIDOS.includes(props.role)) {
      throw new BadRequestException(`Role inválido: ${props.role}. Válidos: ${ROLES_VALIDOS.join(', ')}`);
    }

    Object.assign(this, props);
  }

  static validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
