import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listarUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const listaUsuarios = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
    );

    return listaUsuarios;
  }
}
