import { CaracteristicaProdutoDTO } from './dto/CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './dto/ImagemProduto.dto';

export class ProdutoEntity {
  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  caracteristicas: CaracteristicaProdutoDTO[];
  imagens: ImagemProdutoDTO[];
  categoria: string;
}
