import { Controller, Get, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Query('usuarioId') usuarioId: string) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId);

    return pedidoCriado;
  }

  @Get()
  async pegaPedidos(@Query('usuarioId') usuarioId: string) {
    const pedidosEncontrados =
      await this.pedidoService.encontraPedidos(usuarioId);

    return pedidosEncontrados;
  }
}
