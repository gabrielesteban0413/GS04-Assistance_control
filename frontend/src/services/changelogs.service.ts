import { BACKEND_URL } from '@/constants/urls';
import axios from 'axios';

export enum CHANGELOG_ACTIONS {
    CREATED = 'created',
    UPDATED = 'updated',
    DELETED = 'deleted',
}

export class ChangelogEntity {
    _id!: string;
    created_by!: string;
    action!: CHANGELOG_ACTIONS;
    resource!: string;
    resource_id!: string;
    before!: object | null;
    after!: object | null;
    changes!: object[] | null;
    created_at!: Date;
}

const http = axios.create({
    baseURL: `${BACKEND_URL}/changelogs`,
});

const getAll = async () => {
    const { data } = await http.get<ChangelogEntity[]>('/');
    return data;
};

export const changelogServices = {
    getAll,
};
