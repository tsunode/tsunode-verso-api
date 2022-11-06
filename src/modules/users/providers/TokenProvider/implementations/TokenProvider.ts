import { injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ITokenProvider } from '../models/ITokenProvider';

@injectable()
class TokenProvider implements ITokenProvider {
  constructor() {}

  public async generateToken(userId: string): Promise<string> {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({}, secret, {
      subject: userId,
      expiresIn,
    });
  }
}

export { TokenProvider };
