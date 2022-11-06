export interface IResponseGenerateRefreshToken {
  token: string;
  expiresAt: Date;
}

export interface ITokenProvider {
  generateToken(userId: string): Promise<string>;
}
