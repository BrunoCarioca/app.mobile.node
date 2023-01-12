import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CompanyUserCreateTable1668393017875 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'companies_users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'id_usuario',
                        type: 'int',
                    },
                    {
                        name: 'id_company',
                        type: 'uuid',
                    },
                    {
                        name: 'role_user',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'CompanyUser',
                        columnNames: ['id_usuario'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'UserCompany',
                        columnNames: ['id_company'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'companies',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('companies');
    }
}
