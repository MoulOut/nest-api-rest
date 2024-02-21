import { Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoService {
  async login(email: string, senha: string) {
    return { token: 'Ainda vai ser implementado.' };
  }
}
