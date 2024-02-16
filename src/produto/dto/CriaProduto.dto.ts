import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './ImagemProduto.dto';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsUUID()
  usuarioId: string;

  @IsNotEmpty()
  nome: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  valor: number;

  @Min(0)
  quantidadeDisponivel: number;

  @IsNotEmpty()
  @MaxLength(1000)
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty()
  categoria: string;
}
