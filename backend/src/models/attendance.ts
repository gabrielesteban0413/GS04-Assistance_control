import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user';
import { ScheduleEntity } from './schedule';

@Entity('ATTENDANCES')
export class AttendanceEntity {
    @Index('ATTENDANCES_pkey')
    @PrimaryColumn('uuid')
    _id!: string;

    @Index('ATTENDANCES_user_id')
    @Column('uuid')
    user_id!: string;

    @Column('uuid', { nullable: true })
    schedule_id!: string | null;

    @Column('timestamptz')
    check_in!: Date;

    @Column('timestamptz', { nullable: true })
    check_out!: Date | null;

    @Column('timestamptz')
    created_at!: Date;

    @Column('timestamptz')
    updated_at!: Date;

    @ManyToOne(() => UserEntity, (u) => u._id, { onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user?: UserEntity;

    @ManyToOne(() => ScheduleEntity, (s) => s._id, {
        nullable: true,
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'schedule_id' })
    schedule?: ScheduleEntity | null;
}
