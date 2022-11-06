import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';

import { User } from '../../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  surname: string;
  title?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id: userId,
    email,
    ...restDataFromUser
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const checkEmailAlreadyUsed = await this.usersRepository.findByEmail(email);

    if (checkEmailAlreadyUsed && checkEmailAlreadyUsed.id !== userId) {
      throw new AppError(`Email address already used`);
    }


    const userToUpdate = Object.assign(user, {
      email,
      ...restDataFromUser,
    });

    return this.usersRepository.save(userToUpdate);
  }
}

export { UpdateUserUseCase };
