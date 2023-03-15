import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RefreshUserTableCreate1662930564661 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'refresh_token',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'expiresIn',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'userId',
                        type: 'int',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'token',
                        type: 'text',
                        isNullable: false,
                        isUnique: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'RefreshUser',
                        columnNames: ['userId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('refresh_token');
    }
}
