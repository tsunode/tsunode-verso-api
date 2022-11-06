import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { projectsRouter } from '@modules/projects/infra/http/routes/projects.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/projects', projectsRouter);

export { routes };
