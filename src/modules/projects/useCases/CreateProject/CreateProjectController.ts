import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProjectUseCase } from './CreateProjectUseCase';

class CreateProjectController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, link, adtionalLink } = request.body;
    const { id: userId } = request.user;
    const file = request.file as Express.Multer.File;



    const createProject = container.resolve(CreateProjectUseCase);

    const project = await createProject.execute({
      title,
      description,
      userId,
      link,
      adtionalLink,
      thumb: file.filename,
    });

    return response.json(classToPlain(project));
  }
}

export { CreateProjectController };
