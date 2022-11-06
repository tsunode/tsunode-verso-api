import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ProjectsRepository } from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import { IProjectsRepository } from '../../modules/projects/repositories/IProjectsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);
