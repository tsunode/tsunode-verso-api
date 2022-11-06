import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProjectUseCase } from './DeleteProjectUseCase';

class DeleteProjectController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: userId } = request.user;

    const deleteProject = container.resolve(DeleteProjectUseCase);

    const project = await deleteProject.execute({
      id,
      userId,
    });

    return response.json(classToPlain(project));
  }
}

export { DeleteProjectController };
