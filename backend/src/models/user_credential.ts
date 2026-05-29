import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user';

@Entity('USER_CREDENTIALS')
export class UserCredentialEntity {
    @PrimaryColumn('uuid')
    _id!: string;

    @Index('USER_CREDENTIALS_user_id')
    @Column('uuid')
    user_id!: string;

    @Column('text')
    password!: string;

    @Column('timestamptz')
    created_at!: Date;

    @Column('timestamptz')
    updated_at!: Date;

    @OneToOne(() => UserEntity, (relation) => relation._id, {
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user?: UserEntity;
}
