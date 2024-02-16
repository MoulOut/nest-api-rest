import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';
import { Type } from 'class-transformer';
export class CaracteristicaProdutoDTO {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da caracteristica não pode ser vazia.' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descricao não pode ser vazia.' })
  descricao: string;

  @Type(() => ProdutoEntity)
  produto: ProdutoEntity;
}
