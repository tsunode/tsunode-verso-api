import { injectable, inject } from 'tsyringe';

import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';

interface IRequest {
  page: number;
  pageSize: number;
  q?: string;
  userIdFilter?: string;
}

@injectable()
class ListProjectsUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    q,
    userIdFilter,
  }: IRequest): Promise<Project[] | undefined> {

    const projects = await this.projectsRepository.findAll({
      page,
      pageSize,
      relations: ['user'],
      filters: {
        q,
        userId: userIdFilter,
      },
    });

    return projects;
  }
}

export { ListProjectsUseCase };
