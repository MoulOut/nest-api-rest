import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.nome = produto.nome;
    produtoEntity.usuarioId = produto.usuarioId;
    produtoEntity.valor = produto.valor;
    produtoEntity.quantidadeDisponivel = produto.quantidadeDisponivel;
    produtoEntity.descricao = produto.descricao;
    produtoEntity.categoria = produto.categoria;
    produtoEntity.caracteristicas = produto.caracteristicas;
    produtoEntity.imagens = produto.imagens;

    await this.produtoRepository.save(produtoEntity);
    return produtoEntity;
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
