import { injectable, inject } from 'tsyringe';

import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class DeleteProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<boolean> {
    const project = await this.projectsRepository.findById({
      id,
    });

    if (!project) {
      throw new AppError('Project not exists', 404);
    }

    if (project.userId !== userId) {
      throw new AppError('You dont have permission to delete this question');
    }

    return !!Promise.all([
      this.storageProvider.deleteFile(project.thumb),
      this.projectsRepository.delete(project)
    ])
  }
}

export { DeleteProjectUseCase };
