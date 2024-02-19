import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePedido1708353690039 implements MigrationInterface {
  name = 'AlterTablePedido1708353690039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "senha"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD "senha" character varying(255) NOT NULL`,
    );
  }
}
