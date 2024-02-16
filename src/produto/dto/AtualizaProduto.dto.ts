import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './ImagemProduto.dto';
import { Type } from 'class-transformer';

export class AtualizaProdutoDTO {
  @IsNotEmpty()
  @IsOptional()
  nome: string;
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsOptional()
  valor: number;
  @Min(0)
  @IsOptional()
  quantidadeDisponivel: number;
  @IsNotEmpty()
  @MaxLength(1000)
  @IsOptional()
  descricao: string;
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  @IsOptional()
  imagens: ImagemProdutoDTO[];
  @IsNotEmpty()
  @IsOptional()
  categoria: string;
}
