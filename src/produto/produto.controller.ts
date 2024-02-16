import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { v4 as uuid } from 'uuid';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private produtoRepository: ProdutoRepository,
    private produtoService: ProdutoService,
  ) {}

  @Post()
  async cadastraProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuid();
    produtoEntity.usuarioId = dadosDoProduto.usuarioId;
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.quantidade = dadosDoProduto.quantidade;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.imagens = dadosDoProduto.imagens;
    this.produtoService.criaProduto(produtoEntity);
    return { produto: produtoEntity, message: 'Produto criado com sucesso.' };
  }

  @Get()
  async pegaProdutos() {
    return this.produtoService.listaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(id: string, dadosDoProduto: AtualizaProdutoDTO) {
    const [produtoAtualizado] = await this.produtoService.atualizaProduto(
      id,
      dadosDoProduto,
    );
    return {
      produto: produtoAtualizado,
      message: 'Produto atualizado com sucesso.',
    };
  }
  @Delete('/:id')
  async deletaProduto(id: string) {
    const [produtoDeletado] = await this.produtoService.deletaProduto(id);
    return {
      produto: produtoDeletado,
      message: 'Produto deletado com sucesso.',
    };
  }
}
