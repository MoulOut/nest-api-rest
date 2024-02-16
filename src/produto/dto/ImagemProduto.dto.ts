import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';
import { Type } from 'class-transformer';

export class ImagemProdutoDTO {
  @IsUUID()
  id: string;
  @IsUrl()
  @IsNotEmpty({ message: 'Url da imagem não pode ser vazia.' })
  url: string;
  @IsString()
  @IsNotEmpty({ message: 'Descrição não pode ser vazia.' })
  descricao: string;
  @Type(() => ProdutoEntity)
  produto: ProdutoEntity;
}
