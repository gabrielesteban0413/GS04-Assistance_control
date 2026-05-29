import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsers1780014338471 implements MigrationInterface {
    name = 'AddUsers1780014338471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."USERS_role_enum" AS ENUM('Admin', 'Recursos Humanos', 'Empleado')`);
        await queryRunner.query(`CREATE TYPE "public"."USERS_status_enum" AS ENUM('Activo', 'Inactivo')`);
        await queryRunner.query(`CREATE TYPE "public"."USERS_department_enum" AS ENUM('Finanzas', 'Sistemas', 'Recursos humanos', 'Ventas', 'Logistica')`);
        await queryRunner.query(`CREATE TABLE "USERS" ("_id" uuid NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "role" "public"."USERS_role_enum" NOT NULL, "status" "public"."USERS_status_enum" NOT NULL, "department" "public"."USERS_department_enum" NOT NULL, CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"), CONSTRAINT "PK_31d1474980293bf6e472a9e8cb3" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE INDEX "USERS_pkey" ON "USERS"  ("_id") `);
        await queryRunner.query(`CREATE INDEX "USERS_email" ON "USERS"  ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."USERS_email"`);
        await queryRunner.query(`DROP INDEX "public"."USERS_pkey"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
        await queryRunner.query(`DROP TYPE "public"."USERS_department_enum"`);
        await queryRunner.query(`DROP TYPE "public"."USERS_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."USERS_role_enum"`);
    }

}
