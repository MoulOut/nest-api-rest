import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private produtoRepository: ProdutoRepository,
    private produtoService: ProdutoService,
  ) {}

  @Post()
  async cadastraProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const novoProduto = await this.produtoService.criaProduto(dadosDoProduto);
    return { produto: novoProduto, message: 'Produto criado com sucesso.' };
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
