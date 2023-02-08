import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ActivityCreateTable1673912001222 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'activities',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'activity',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'status',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'id_project',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'id_user',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'start',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'end',
                        type: 'timestamp with time zone',
                        isNullable: true,
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
                        name: 'ProjectActivity',
                        columnNames: ['id_project'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'projects',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'UserActivity',
                        columnNames: ['id_user'],
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
        await queryRunner.dropTable('activities');
    }
}
