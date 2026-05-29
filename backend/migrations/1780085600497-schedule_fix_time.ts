import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ScheduleFixTime1780085600497 implements MigrationInterface {
    name = 'ScheduleFixTime1780085600497';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SCHEDULES" DROP COLUMN "start_time"`);
        await queryRunner.query(
            `ALTER TABLE "SCHEDULES" ADD "start_time" TIME WITH TIME ZONE NOT NULL`,
        );
        await queryRunner.query(`ALTER TABLE "SCHEDULES" DROP COLUMN "end_time"`);
        await queryRunner.query(
            `ALTER TABLE "SCHEDULES" ADD "end_time" TIME WITH TIME ZONE NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SCHEDULES" DROP COLUMN "end_time"`);
        await queryRunner.query(
            `ALTER TABLE "SCHEDULES" ADD "end_time" TIMESTAMP WITH TIME ZONE NOT NULL`,
        );
        await queryRunner.query(
            `ALTER implements MigrationInterfaceTABLE "SCHEDULES" DROP COLUMN "start_time"`,
        );
        await queryRunner.query(
            `ALTER TABLE "SCHEDULES" ADD "start_time" TIMESTAMP WITH TIME ZONE NOT NULL`,
        );
    }
}
