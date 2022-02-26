import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStocks1645791172197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stocks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'low_amount',
            type: 'float',
            default: 2,
          },
          {
            name: 'unit_type',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKProductStock',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
          },
          {
            name: 'FKSupplierStock',
            referencedTableName: 'suppliers',
            referencedColumnNames: ['id'],
            columnNames: ['supplier_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stocks');
  }
}
