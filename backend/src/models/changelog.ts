import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

export enum CHANGELOG_ACTIONS {
    CREATED = 'created',
    UPDATED = 'updated',
    DELETED = 'deleted',
}

@Entity('CHANGELOGS')
export class ChangelogEntity {
    @PrimaryColumn('uuid')
    _id!: string;

    @Column('uuid')
    created_by!: string;

    @Column('enum', { enum: CHANGELOG_ACTIONS })
    action!: CHANGELOG_ACTIONS;

    @Column('text')
    resource!: string;

    @Column('text')
    resource_id!: string;

    @Column('jsonb', { nullable: true })
    before!: object | null;

    @Column('jsonb', { nullable: true })
    after!: object | null;

    @Column('jsonb', { nullable: true })
    changes!: object[] | null;

    @Column('timestamptz')
    created_at!: Date;
}
