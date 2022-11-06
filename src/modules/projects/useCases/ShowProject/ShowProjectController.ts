import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProjectUseCase } from './ShowProjectUseCase';

class ShowProjectController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProject = container.resolve(ShowProjectUseCase);

    const project = await showProject.execute(id);

    return response.json(classToPlain(project));
  }
}

export { ShowProjectController };
