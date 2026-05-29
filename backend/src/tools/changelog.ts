import { appDataSource } from '../db/client';
import { CHANGELOG_ACTIONS, ChangelogEntity } from '../models/changelog';
import { UserEntity } from '../models/user';
import { datetimeTool } from './datetime';
import { uuidTool } from './uuid';
import { jwtTool } from './jwt';

type Requester = { created_by: string; login: string };

const SYSTEM: Requester = {
    created_by: '00000000-0000-0000-0000-000000000000',
    login: 'system',
};

export const getRequester = async (authorization?: string): Promise<Requester> => {
    if (!authorization) return SYSTEM;
    try {
        const token = authorization.replace('Bearer ', '');
        const payload = await jwtTool.verify<{ userId: string }>(token);
        const user = await appDataSource.manager.findOneBy(UserEntity, { _id: payload.userId });
        if (!user) return SYSTEM;
        return { created_by: user._id, login: user.email };
    } catch {
        return SYSTEM;
    }
};

export const computeChanges = (
    before: Record<string, unknown>,
    after: Record<string, unknown>,
): object[] =>
    Object.keys(after)
        .filter((key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]))
        .map((key) => ({ field: key, from: before[key], to: after[key] }));

type SaveChangelogParams = {
    requester: Requester;
    action: CHANGELOG_ACTIONS;
    resource: string;
    resource_id: string;
    before?: object | null;
    after?: object | null;
    changes?: object[] | null;
};

export const saveChangelog = async (params: SaveChangelogParams): Promise<void> => {
    try {
        const entry = appDataSource.manager.create(ChangelogEntity, {
            _id: uuidTool.create(),
            created_by: params.requester.created_by,
            login: params.requester.login,
            action: params.action,
            resource: params.resource,
            resource_id: params.resource_id,
            before: params.before ?? null,
            after: params.after ?? null,
            changes: params.changes ?? null,
            created_at: datetimeTool.now(),
        });
        await appDataSource.manager.save(ChangelogEntity, entry);
    } catch (err) {
        console.error('Changelog save failed', err);
    }
};
