import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/criaPedido.dto';

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
}
