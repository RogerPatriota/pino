import { BadRequestException } from '@nestjs/common';

type ClienteProps = {
  assistenciaId: string;
  nome: string;
  numero?: string | null;
  cpfCnpj?: string | null;
  endereco?: string | null;
  observacoes?: string | null;
};

export class Cliente {
  id: string;
  assistenciaId: string;
  nome: string;
  numero: string | null;
  cpfCnpj: string | null;
  endereco: string | null;
  observacoes: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ClienteProps) {
    if (props.numero) {
      props.numero = props.numero.replace(/\D/g, '');
    }

    if (props.cpfCnpj) {
      props.cpfCnpj = props.cpfCnpj.replace(/\D/g, '');
      if (!Cliente.validarCpfCnpj(props.cpfCnpj)) {
        throw new BadRequestException(`CPF/CNPJ inválido: ${props.cpfCnpj}`);
      }
    }

    Object.assign(this, props);
  }

  static validarCpfCnpj(valor: string): boolean {
    if (valor.length === 11) return Cliente.validarCpf(valor);
    if (valor.length === 14) return Cliente.validarCnpj(valor);
    return false;
  }

  private static validarCpf(cpf: string): boolean {
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  }

  private static validarCnpj(cnpj: string): boolean {
    if (/^(\d)\1+$/.test(cnpj)) return false;

    const calcDigito = (cnpj: string, pesos: number[]) => {
      const soma = pesos.reduce((acc, peso, i) => acc + parseInt(cnpj[i]) * peso, 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const d1 = calcDigito(cnpj, pesos1);
    const d2 = calcDigito(cnpj, pesos2);

    return d1 === parseInt(cnpj[12]) && d2 === parseInt(cnpj[13]);
  }
}
