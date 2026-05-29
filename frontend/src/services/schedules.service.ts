import { BACKEND_URL } from '@/constants/urls';
import axios from 'axios';

export class ScheduleEntity {
    _id!: string;
    name!: string;
    start_time!: string;
    end_time!: string;
    created_at!: Date;
    updated_at!: Date;
    deleted_at!: Date | null;
}

const http = axios.create({
    baseURL: `${BACKEND_URL}/schedules`,
});

const getAll = async () => {
    const { data } = await http.get<ScheduleEntity[]>('/');
    return data;
};

const create = async (item: ScheduleEntity) => {
    const { data } = await http.post<ScheduleEntity>('/', item);
    return data;
};

const update = async (id: ScheduleEntity['_id'], item: ScheduleEntity) => {
    const { data } = await http.patch<ScheduleEntity>(`/${id}`, item);
    return data;
};

const deleteOne = async (id: ScheduleEntity['_id']) => {
    await http.delete(`/${id}`);
};

export const scheduleServices = {
    getAll,
    create,
    update,
    delete: deleteOne,
};
