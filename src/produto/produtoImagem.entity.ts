import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemEntity {
  @PrimaryColumn({ name: 'url', nullable: false })
  url: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;
}
