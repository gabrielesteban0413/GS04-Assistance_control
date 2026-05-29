import { BACKEND_URL } from '@/constants/urls';
import axios from 'axios';
import { UserEntity } from './users.service';

export type UserSessionEntity = { user: UserEntity; token: string };

const http = axios.create({
    baseURL: `${BACKEND_URL}/auth`,
});

const login = async (email: string, password: string) => {
    const { data } = await http.post<UserSessionEntity>('/login', {
        email,
        password,
    });
    return data;
};

export const authServices = {
    login,
};
