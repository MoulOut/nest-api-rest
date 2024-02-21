import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProdutoEntity } from './produto.entity';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private produtoService: ProdutoService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async cadastraProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const novoProduto = await this.produtoService.criaProduto(dadosDoProduto);
    return { produto: novoProduto, message: 'Produto criado com sucesso.' };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async pegaProdutos() {
    return this.produtoService.listaProdutos();
  }

  @Get('/:id')
  async pegaUmProduto(@Param('id') id: string) {
    let produto = await this.cacheManager.get<ProdutoEntity>(`produto-${id}`);

    if (produto) console.log('Produto obtido do cache');

    if (!produto) {
      console.log('Produto obtido do DB');
      produto = await this.produtoService.listaUmProduto(id);

      await this.cacheManager.set(`produto-${id}`, produto);
    }

    return {
      message: 'Produto encontrado.',
      produto,
    };
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
