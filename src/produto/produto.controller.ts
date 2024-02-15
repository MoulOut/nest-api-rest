import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { v4 as uuid } from 'uuid';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  @Post()
  async cadastraProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.nome = dadosDoProduto.nome;
    // produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.descricao = dadosDoProduto.descricao;
    // produtoEntity.imagens = dadosDoProduto.imagens;
    produtoEntity.quantidade = dadosDoProduto.quantidade;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.usuarioId = dadosDoProduto.usuarioId;
    produtoEntity.id = uuid();
    this.produtoRepository.salvar(produtoEntity);
    return { produto: produtoEntity, message: 'Produto criado com sucesso.' };
  }

  @Get()
  async pegaProdutos() {
    return this.produtoRepository.pegaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(id: string, dadosDoProduto: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.atualizar(
      id,
      dadosDoProduto,
    );
    return {
      produto: produtoAtualizado,
      message: 'Produto atualzado com sucesso',
    };
  }
  @Delete('/:id')
  async deletaProduto(id: string) {
    const produtoDeletado = await this.produtoRepository.deleta(id);
    return {
      produto: produtoDeletado,
      message: 'Produto deletado com sucesso',
    };
  }
}
