import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { criaUsuarioDto } from './dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: criaUsuarioDto) {
    this.usuarioRepository.salvar(dadosDoUsuario);
    return { message: dadosDoUsuario };
  }

  @Get()
  async pegaUsuarios() {
    return this.usuarioRepository.retornaUsuarios();
  }
}
