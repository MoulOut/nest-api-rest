import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './criaPedido.dto';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}
