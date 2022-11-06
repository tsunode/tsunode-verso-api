import { injectable, inject } from 'tsyringe';

import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(id: string): Promise<Project> {
    const project = await this.projectsRepository.findById({
      id,
      relations: ['user'],
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return project;
  }
}

export { ShowProjectUseCase };
