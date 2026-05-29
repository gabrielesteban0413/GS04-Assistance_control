import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserCredentials1780062901077 implements MigrationInterface {
    name = 'AddUserCredentials1780062901077';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "USER_CREDENTIALS" ("_id" uuid NOT NULL, "user_id" uuid NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "REL_c67a3efa8f950414e295d4a998" UNIQUE ("user_id"), CONSTRAINT "PK_9f6b52d22db13ffaaf99c7f0df4" PRIMARY KEY ("_id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "USER_CREDENTIALS_user_id" ON "USER_CREDENTIALS"  ("user_id") `,
        );
        await queryRunner.query(
            `ALTER TABLE "USER_CREDENTIALS" ADD CONSTRAINT "FK_c67a3efa8f950414e295d4a998e" FOREIGN KEY ("user_id") REFERENCES "USERS"("_id") ON DELETE NO ACTION ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "USER_CREDENTIALS" DROP CONSTRAINT "FK_c67a3efa8f950414e295d4a998e"`,
        );
        await queryRunner.query(`DROP INDEX "public"."USER_CREDENTIALS_user_id"`);
        await queryRunner.query(`DROP TABLE "USER_CREDENTIALS"`);
    }
}
