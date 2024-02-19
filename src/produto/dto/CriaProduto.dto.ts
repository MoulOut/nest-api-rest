import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './ImagemProduto.dto';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  nome: string;

  @IsPositive({ message: 'Precisa ser um numero positivo' })
  @IsNumber(
    { maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false },
    { message: 'Precisa ser um numero.' },
  )
  valor: number;

  @Min(0, { message: `Valor minimo é 0.` })
  quantidadeDisponivel: number;

  @IsNotEmpty({ message: 'Descrição não pode ser vazia.' })
  @MaxLength(1000, { message: 'Valor maximo de caracteres é 1000.' })
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

  @IsNotEmpty({ message: 'Categoria não pode ser vazia.' })
  categoria: string;
}
