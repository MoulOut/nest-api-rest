import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/statuspedido.enum';

export class AtualizaPedidoDto {
  @IsEnum(StatusPedido)
  statusPedido: StatusPedido;
}
