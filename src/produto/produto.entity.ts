import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// class CaracteristicaProduto {
//   nome: string;
//   descricao: string;
// }

// class ImagemProduto {
//   url: string;
//   descricao: string;
// }

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', nullable: false, length: 100 })
  usuarioId: string;

  @Column({ name: 'nome', nullable: false, length: 100 })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'descricao', nullable: false, length: 255 })
  descricao: string;

  @Column({ name: 'categoria', nullable: false, length: 100 })
  categoria: string;

  // @Column({ name: 'nome', nullable: false, length: 100 })
  // caracteristicas: CaracteristicaProduto[];
  // imagens: ImagemProduto[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: string;
}
