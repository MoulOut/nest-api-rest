import { Injectable, NotFoundException } from '@nestjs/common';
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

  async atualizaProduto(id: string, dadosDoProduto: AtualizaProdutoDTO) {
    const produtoAtualizar = await this.produtoRepository.findOneBy({
      id,
    });

    if (produtoAtualizar === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(produtoAtualizar, dadosDoProduto);
    await this.produtoRepository.save(produtoAtualizar);
    return produtoAtualizar;
  }

  async deletaProduto(id: string) {
    const produtoDeletado = await this.produtoRepository.findOneBy({
      id,
    });

    if (produtoDeletado === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }
    await this.produtoRepository.delete(id);
    return produtoDeletado;
  }
}
