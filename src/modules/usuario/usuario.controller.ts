import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { atualizaUsuarioDto } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashSenhaPipe } from '../../resources/pipes/hash-senha.pipe';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDto,
    @Body('senha', HashSenhaPipe) senhaHasheada: string,
  ) {
    const novoUsuario = await this.usuarioService.criaUsuario({
      ...dadosDoUsuario,
      senha: senhaHasheada,
    });

    return {
      usuario: new ListaUsuarioDto(novoUsuario.id, novoUsuario.nome),
      message: 'Usuario criado com sucesso.',
    };
  }

  @Get()
  async pegaUsuarios() {
    const usuariosExistentes = await this.usuarioService.listarUsuarios();

    return usuariosExistentes;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: atualizaUsuarioDto,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioDeletado,
      message: 'Usuário deletado com sucesso.',
    };
  }
}
