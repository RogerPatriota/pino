import { BadRequestException } from '@nestjs/common';

type AssistenciaConfig = {
  iaAtiva: boolean;
  notificarClienteAutomaticamente: boolean;
};

type AssistenciaProps = {
  nome: string;
  telefone: string;
  logoUrl?: string | null;
  cnpj?: string | null;
  endereco?: string | null;
  promptCustomizado?: string | null;
  especialidades?: string[];
  configuracoes?: AssistenciaConfig;
};

export class Assistencia {
  id: string;
  nome: string;
  logoUrl?: string | null;
  cnpj?: string | null;
  telefone: string;
  endereco?: string | null;
  promptCustomizado?: string | null;
  especialidades?: string[];
  configuracoes?: AssistenciaConfig;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: AssistenciaProps) {
    if (props.cnpj && !Assistencia.validarCnpj(props.cnpj)) {
      throw new BadRequestException(`CNPJ inválido: ${props.cnpj}`);
    }

    Object.assign(this, props);
  }

  // Validação completa de CNPJ (dígitos verificadores)
  static validarCnpj(cnpj: string): boolean {
    const clean = cnpj.replace(/\D/g, '');

    if (clean.length !== 14) return false;
    if (/^(\d)\1+$/.test(clean)) return false; // todos dígitos iguais

    const calcDigit = (base: string, weights: number[]) => {
      const sum = base
        .split('')
        .reduce((acc, d, i) => acc + Number(d) * weights[i], 0);
      const rem = sum % 11;
      return rem < 2 ? 0 : 11 - rem;
    };

    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const d1 = calcDigit(clean.slice(0, 12), w1);
    const d2 = calcDigit(clean.slice(0, 13), w2);

    return Number(clean[12]) === d1 && Number(clean[13]) === d2;
  }
}
