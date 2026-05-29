import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import type { UserEntity } from './user';

@Entity('SCHEDULES')
export class ScheduleEntity {
    @Index('SCHEDULES_pkey')
    @PrimaryColumn('uuid')
    _id!: string;

    @Column('text')
    name!: string;

    @Column('timetz')
    start_time!: string;

    @Column('timetz')
    end_time!: string;

    @Column('timestamptz')
    created_at!: Date;

    @Column('timestamptz')
    updated_at!: Date;

    @Column('timestamptz', { nullable: true })
    deleted_at!: Date | null;

    @ManyToMany('UserEntity', 'schedules')
    @JoinTable({
        name: 'USER_SCHEDULES',
        joinColumn: { name: 'schedule_id', referencedColumnName: '_id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: '_id' },
    })
    users?: UserEntity[];
}
