import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ListProjectsController } from '@modules/projects/useCases/ListProjects/ListProjectsController';
import { ShowProjectController } from '@modules/projects/useCases/ShowProject/ShowProjectController';

import { DeleteProjectController } from '@modules/projects/useCases/DeleteProject/DeleteProjectController';
import { getUser } from '@modules/users/infra/http/middlewares/getUser';

import { CreateProjectController } from '../../../useCases/CreateProject/CreateProjectController';
import { ProjectValidators } from '../validators/Project';

const projectsRouter = Router();
const createProjectController = new CreateProjectController();
const listProjectsController = new ListProjectsController();
const showProjectController = new ShowProjectController();
const deleteProjectController = new DeleteProjectController();

const upload = multer(uploadConfig.multer);

projectsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('thumb'),
  ProjectValidators.create,
  createProjectController.handle,
);

projectsRouter.get(
  '/:id',
  ProjectValidators.show,
  showProjectController.handle,
);

projectsRouter.get(
  '/',
  getUser,
  ProjectValidators.index,
  listProjectsController.handle,
);

projectsRouter.delete(
  '/:id',
  ensureAuthenticated,
  ProjectValidators.delete,
  deleteProjectController.handle,
);

export { projectsRouter };
