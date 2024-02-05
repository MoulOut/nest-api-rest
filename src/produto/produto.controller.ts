import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  @Post()
  async cadastraProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    this.produtoRepository.salvar(dadosDoProduto);
    return { message: dadosDoProduto };
  }

  @Get()
  async pegaProdutos() {
    return this.produtoRepository.pegaProdutos();
  }
}
