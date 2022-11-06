import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProjectsUseCase } from './ListProjectsUseCase';

class ListProjectsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      page,
      pageSize,
      q,
      userId: userIdFilter,
    } = request.query;


    const listPorjects = container.resolve(ListProjectsUseCase);

    const projects = await listPorjects.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      q: q as string,
      userIdFilter: userIdFilter as string,
    });

    return response.json(classToPlain(projects));
  }
}

export { ListProjectsController };
