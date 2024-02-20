import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

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
  async atualizaProduto(
    @Param('id') id: string,
    @Body() dadosDoProduto: AtualizaProdutoDTO,
  ) {
    const produtoAtualizado = await this.produtoService.atualizaProduto(
      id,
      dadosDoProduto,
    );
    return {
      message: 'Produto atualizado com sucesso.',
      produto: produtoAtualizado,
    };
  }

  @Delete('/:id')
  async deletaProduto(@Param('id') id: string) {
    const produtoDeletado = await this.produtoService.deletaProduto(id);
    return {
      message: 'Produto deletado com sucesso.',
      produto: produtoDeletado,
    };
  }
}