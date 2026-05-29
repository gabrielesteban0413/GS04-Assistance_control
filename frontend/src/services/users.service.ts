import { BACKEND_URL } from '@/constants/urls';
import axios from 'axios';

export enum USER_DEPARTMENTS {
    FINANCE = 'Finanzas',
    SYSTEM = 'Sistemas',
    RH = 'Recursos humanos',
    SALES = 'Ventas',
    LOGISTICS = 'Logistica',
}

export enum USER_STATUSES {
    ACTIVE = 'Activo',
    INACTIVE = 'Inactivo',
}

export enum USER_ROLES {
    ADMIN = 'Admin',
    RH = 'Recursos Humanos',
    EMPLOYEE = 'Empleado',
}

export type UserEntity = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    role: USER_ROLES;
    status: USER_STATUSES;
    department: USER_DEPARTMENTS;
};

const http = axios.create({
    baseURL: `${BACKEND_URL}/users`,
});

const getAll = async () => {
    const { data } = await http.get<UserEntity[]>('/');
    return data;
};

const create = async (item: UserEntity) => {
    const { data } = await http.post<UserEntity>('/', item);
    return data;
};

const update = async (id: UserEntity['_id'], item: UserEntity) => {
    const { data } = await http.patch<UserEntity>(`/${id}`, item);
    return data;
};

const deleteOne = async (id: UserEntity['_id']) => {
    await http.delete(`/${id}`);
};

export const userServices = {
    getAll,
    create,
    update,
    delete: deleteOne,
};
