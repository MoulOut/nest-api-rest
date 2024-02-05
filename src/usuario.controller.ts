import { Controller, Post } from '@nestjs/common';

@Controller('/usuarios')
export class UsuarioController {
  @Post()
  async criaUsuario() {
    return 'usuario criado';
  }
}
