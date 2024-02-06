import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async retornaUsuarios() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }

  async atualiza(id: string, dados: Partial<UsuarioEntity>) {
    const possibleUser = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possibleUser) {
      throw new Error('Usuário não existe.');
    }

    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === id) return;

      possibleUser[chave] = valor;
    });

    return possibleUser;
  }

  async deletar(id: string) {
    const userToDelete = this.usuarios.find((usuario) => usuario.id === id);

    if (!userToDelete) {
      throw new Error('Usuário não existe.');
    }

    this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
    return userToDelete;
  }
}
