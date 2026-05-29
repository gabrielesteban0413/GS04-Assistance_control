import Elysia from 'elysia';
import { appDataSource } from 'src/db/client';
import { ChangelogEntity } from 'src/models/changelog';

export const changelogRoutes = new Elysia();

changelogRoutes.group(
    '/changelogs',
    {
        detail: { tags: ['Changelogs'] },
    },
    (app) => {
        app.get('/', async () => {
            try {
                return appDataSource.manager.find(ChangelogEntity);
            } catch (error) {
                return error;
            }
        });

        return app;
    },
);
