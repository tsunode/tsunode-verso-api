import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

import { User } from '../../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  title: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) {}

  public async execute({
    name,
    surname,
    email,
    password,
    title
  }: IRequest): Promise<User> {
    const checkUserExistis = await this.usersRepository.findByEmail(email);

    if (checkUserExistis) {
      throw new AppError(`Email address already used`);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
      title,
    });

    return user;
  }
}

export { CreateUserUseCase };
