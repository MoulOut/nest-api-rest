import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produto_caracteristicas' })
export class ProdutoCaracteristicasEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;
}
