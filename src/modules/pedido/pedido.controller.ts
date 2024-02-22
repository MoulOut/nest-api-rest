import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/criaPedido.dto';
import { AtualizaPedidoDto } from './dto/atualizaPedido.dto';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CriaPedidoDto,
  ) {
    const usuarioId = req.usuario.sub;
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );

    return pedidoCriado;
  }

  @Get()
  async pegaPedidos(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidosEncontrados =
      await this.pedidoService.encontraPedidos(usuarioId);

    return pedidosEncontrados;
  }

  @Patch(':id')
  async atualizaPedido(
    @Req() req: RequisicaoComUsuario,
    @Param('id') pedidoId: string,
    @Body() novoStatus: AtualizaPedidoDto,
  ) {
    const usuarioId = req.usuario.sub;
    return await this.pedidoService.atualizaPedido(
      pedidoId,
      novoStatus,
      usuarioId,
    );
  }
}
