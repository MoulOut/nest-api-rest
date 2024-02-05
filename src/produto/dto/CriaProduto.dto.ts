import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsPositive,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './ImagemProduto.dto';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsNotEmpty()
  nome: string;
  @IsPositive()
  @IsDecimal({ decimal_digits: '2' })
  valor: number;
  @Min(0)
  quantidade: number;
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
