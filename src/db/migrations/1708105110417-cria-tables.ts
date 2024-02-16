import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaTables1708105110417 implements MigrationInterface {
  name = 'CriaTables1708105110417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "nome"`);
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "nome" character varying(150) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "nome"`);
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "nome" character varying(100) NOT NULL`,
    );
  }
}
