import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/criaPedido.dto';
import { AtualizaPedidoDto } from './dto/atualizaPedido.dto';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDto,
  ) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );

    return pedidoCriado;
  }

  @Get()
  async pegaPedidos(@Query('usuarioId') usuarioId: string) {
    const pedidosEncontrados =
      await this.pedidoService.encontraPedidos(usuarioId);

    return pedidosEncontrados;
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() novoStatus: AtualizaPedidoDto,
  ) {
    return await this.pedidoService.atualizaPedido(pedidoId, novoStatus);
  }
}
