import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  @Post()
  async cadastraProduto(@Body() dadosDoProduto) {
    this.produtoRepository.salvar(dadosDoProduto);
    return { message: dadosDoProduto };
  }

  @Get()
  async pegaProdutos() {
    return this.produtoRepository.pegaProdutos();
  }
}
