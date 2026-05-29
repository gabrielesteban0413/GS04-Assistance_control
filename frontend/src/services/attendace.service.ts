import axios from 'axios';
import { BACKEND_URL } from '@/constants/urls';
import { UserEntity } from './users.service';

export class AttendanceEntity {
    _id!: string;
    user_id!: string;
    schedule_id!: string | null;
    check_in!: Date;
    check_out!: Date | null;
    created_at!: Date;
    updated_at!: Date;
}

const http = axios.create({
    baseURL: `${BACKEND_URL}/attendances`,
});

const getAll = async () => {
    const { data } = await http.get<AttendanceEntity[]>('/');
    return data;
};

const createIn = async (email: UserEntity['email']) => {
    const { data } = await http.post<AttendanceEntity>('/in', { email });
    return data;
};

const createOut = async (email: UserEntity['email']) => {
    const { data } = await http.post<AttendanceEntity>('/out', { email });
    return data;
};

export const attendanceServices = {
    getAll,
    createIn,
    createOut,
};
