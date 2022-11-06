import { injectable, inject } from 'tsyringe';

import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  title: string;
  description: string;
  link: string;
  adtionalLink: string;
  userId: string;
  thumb: string;
}

@injectable()
class CreateProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    description,
    link,
    adtionalLink,
    thumb,
    userId,
  }: IRequest): Promise<Project> {
    const checkUserExistis = await this.usersRepository.findById(userId);

    if (!checkUserExistis) {
      throw new AppError('User not exists', 404);
    }

    const fileName = await this.storageProvider.saveFile({
      file: thumb,
      path: `user/${checkUserExistis.id}/projects/${thumb}`,
    });

    const project = await this.projectsRepository.create({
      title,
      description,
      userId,
      link,
      adtionalLink,
      thumb: fileName,
    });

    return project;
  }
}

export { CreateProjectUseCase };
