import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScheduleAttendaces1780084107880 implements MigrationInterface {
    name = 'AddScheduleAttendaces1780084107880';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "SCHEDULES" ("_id" uuid NOT NULL, "name" text NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_dd85435d4fac5d99699d031c467" PRIMARY KEY ("_id"))`,
        );
        await queryRunner.query(`CREATE INDEX "SCHEDULES_pkey" ON "SCHEDULES"  ("_id") `);
        await queryRunner.query(
            `CREATE TABLE "ATTENDANCES" ("_id" uuid NOT NULL, "user_id" uuid NOT NULL, "schedule_id" uuid, "check_in" TIMESTAMP WITH TIME ZONE NOT NULL, "check_out" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d07f2efa3b19b43d3e4192a6e79" PRIMARY KEY ("_id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "ATTENDANCES_pkey" ON "ATTENDANCES"  ("_id") `,
        );
        await queryRunner.query(
            `CREATE INDEX "ATTENDANCES_user_id" ON "ATTENDANCES"  ("user_id") `,
        );
        await queryRunner.query(
            `CREATE TABLE "USER_SCHEDULES" ("schedule_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_4b939532627b4f8a7591b4c77ce" PRIMARY KEY ("schedule_id", "user_id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_203f287b63a79d5a0c8f40320b" ON "USER_SCHEDULES"  ("schedule_id") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_3cece67cc9a837905985ce2e99" ON "USER_SCHEDULES"  ("user_id") `,
        );
        await queryRunner.query(
            `ALTER TABLE "ATTENDANCES" ADD CONSTRAINT "FK_1673e54fc2e4a8ef05fbc58fa9e" FOREIGN KEY ("user_id") REFERENCES "USERS"("_id") ON DELETE NO ACTION ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "ATTENDANCES" ADD CONSTRAINT "FK_f7eb4f36af18e2dd82714126ad9" FOREIGN KEY ("schedule_id") REFERENCES "SCHEDULES"("_id") ON DELETE NO ACTION ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "USER_SCHEDULES" ADD CONSTRAINT "FK_203f287b63a79d5a0c8f40320bb" FOREIGN KEY ("schedule_id") REFERENCES "SCHEDULES"("_id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "USER_SCHEDULES" ADD CONSTRAINT "FK_3cece67cc9a837905985ce2e99d" FOREIGN KEY ("user_id") REFERENCES "USERS"("_id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "USER_SCHEDULES" DROP CONSTRAINT "FK_3cece67cc9a837905985ce2e99d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "USER_SCHEDULES" DROP CONSTRAINT "FK_203f287b63a79d5a0c8f40320bb"`,
        );
        await queryRunner.query(
            `ALTER TABLE "ATTENDANCES" DROP CONSTRAINT "FK_f7eb4f36af18e2dd82714126ad9"`,
        );
        await queryRunner.query(
            `ALTER TABLE "ATTENDANCES" DROP CONSTRAINT "FK_1673e54fc2e4a8ef05fbc58fa9e"`,
        );
        await queryRunner.query(`DROP INDEX "public"."IDX_3cece67cc9a837905985ce2e99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_203f287b63a79d5a0c8f40320b"`);
        await queryRunner.query(`DROP TABLE "USER_SCHEDULES"`);
        await queryRunner.query(`DROP INDEX "public"."ATTENDANCES_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."ATTENDANCES_pkey"`);
        await queryRunner.query(`DROP TABLE "ATTENDANCES"`);
        await queryRunner.query(`DROP INDEX "public"."SCHEDULES_pkey"`);
        await queryRunner.query(`DROP TABLE "SCHEDULES"`);
    }
}
