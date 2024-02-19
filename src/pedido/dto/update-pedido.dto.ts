import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDto } from './criaPedido.dto';

export class UpdatePedidoDto extends PartialType(CriaPedidoDto) {}
