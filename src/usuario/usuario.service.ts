import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { atualizaUsuarioDto } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listarUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const listaUsuarios = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
    );

    return listaUsuarios;
  }

  async atualizaUsuario(id: string, novosDados: atualizaUsuarioDto) {
    await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
