import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'valor_total', nullable: false })
  valorTotal: number;

  @Column({ name: 'status', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: string;
}
