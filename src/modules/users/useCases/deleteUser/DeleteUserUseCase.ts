import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';


interface IRequest {
  id: string;
  idToDelete: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, idToDelete }: IRequest): Promise<boolean> {
    if (id !== idToDelete) {
      throw new AppError(`You don't have access to this action`, 403);
    }

    const checkUserExistis = await this.usersRepository.findById(id);

    if (!checkUserExistis) {
      throw new AppError(`User not found`, 404);
    }

    return this.usersRepository.delete(checkUserExistis);
  }
}

export { DeleteUserUseCase };
