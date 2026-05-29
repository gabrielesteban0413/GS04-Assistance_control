import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChangelog1780088432515 implements MigrationInterface {
    name = 'AddChangelog1780088432515';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."CHANGELOGS_action_enum" AS ENUM('created', 'updated', 'deleted')`,
        );
        await queryRunner.query(
            `CREATE TABLE "CHANGELOGS" ("_id" uuid NOT NULL, "created_by" uuid NOT NULL, "action" "public"."CHANGELOGS_action_enum" NOT NULL, "resource" text NOT NULL, "resource_id" text NOT NULL, "before" jsonb, "after" jsonb, "changes" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_963d2ccb03ba341440e957f8dd8" PRIMARY KEY ("_id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "CHANGELOGS"`);
        await queryRunner.query(`DROP TYPE "public"."CHANGELOGS_action_enum"`);
    }
}
