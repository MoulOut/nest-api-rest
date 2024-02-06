import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async pegaProdutos() {
    return this.produtos;
  }
  async atualizar(id: string, novosDados: Partial<ProdutoEntity>) {
    const produto = await this.produtos.find((produto) => produto.id === id);

    if (produto) {
      throw new Error('Produto não existe.');
    }

    Object.entries(novosDados).forEach(([chave, valor]) => {
      if (chave === 'id' || 'usuarioId') return;

      produto[chave] = valor;
    });

    return produto;
  }
  async deleta(id: string) {
    const produto = await this.produtos.find((produto) => produto.id === id);

    if (produto) {
      throw new Error('Produto não existe.');
    }

    this.produtos = this.produtos.filter((produto) => {
      produto.id !== id;
    });
    return produto;
  }
}
