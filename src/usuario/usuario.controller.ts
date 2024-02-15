import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { criaUsuarioDto } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { atualizaUsuarioDto } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService,
  ) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: criaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
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
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
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
    const usuarioDeletado = await this.usuarioRepository.deletar(id);

    return {
      usuario: usuarioDeletado,
      message: 'Usuário deletedo com sucesso',
    };
  }
}
