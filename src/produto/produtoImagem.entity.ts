import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', nullable: false })
  url: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produtoEntity) => produtoEntity.imagens)
  produto: ProdutoEntity;
}
