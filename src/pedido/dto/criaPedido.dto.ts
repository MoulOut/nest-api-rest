import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ItemPedidoDto {
  @IsUUID()
  produtoId: string;

  @IsInt({ message: 'Precisa ser um numero inteiro' })
  quantidade: number;
}

export class CriaPedidoDto {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDto)
  itensPedido: ItemPedidoDto[];
}
