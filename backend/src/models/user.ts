import {
    Column,
    Entity,
    Index,
    PrimaryColumn,
} from 'typeorm';

export enum USER_DEPARTMENTS{
    FINANCE = "Finanzas",
    SYSTEM = "Sistemas",
    RH = "Recursos humanos",
    SALES = "Ventas",
    LOGISTICS = "Logistica"
}

export enum USER_STATUSES{
    ACTIVE = "Activo",
    INACTIVE = "Inactivo"
}

export enum USER_ROLES{
    ADMIN = "Admin",
    RH = "Recursos Humanos",
    EMPLOYEE = "Empleado"
}

@Entity('USERS')
export class UserEntity {
    @Index('USERS_pkey')
    @PrimaryColumn('uuid')
    _id!: string;

    @Column('text')
    first_name!: string;

    @Column('text')
    last_name!: string;

    @Index('USERS_email')
    @Column('text', {
        unique: true,
    })
    email!: string;

    @Column('timestamptz')
    created_at!: Date;

    @Column('timestamptz')
    updated_at!: Date;

    @Column('timestamptz', {
        nullable: true,
    })
    deleted_at!: Date | null;

    @Column('enum', {enum: USER_ROLES})
    role!: USER_ROLES;

    @Column('enum', {enum: USER_STATUSES})
    status!: USER_STATUSES;
    
    @Column('enum', {enum: USER_DEPARTMENTS})
    department!: USER_DEPARTMENTS
}

