import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produto: ProdutoEntity) {
    await this.produtoRepository.save(produto);
    return produto;
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find();

    return produtosSalvos;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.find({
      where: { id: id },
    });
    await this.produtoRepository.update(id, novosDados);
    return produtoAtualizado;
  }

  async deletaProduto(id: string) {
    const produtoDeletado = await this.produtoRepository.find({
      where: { id: id },
    });
    await this.produtoRepository.delete(id);
    return produtoDeletado;
  }
}
