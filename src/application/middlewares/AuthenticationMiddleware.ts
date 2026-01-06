
import { IMiddleware, IResponse, IRequest, IData } from "../interfaces/IMiddleware";
import { env } from '../../application/config/env';
import jwt from 'jsonwebtoken';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: { message: 'Invalid access token.' }
      };
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        throw new Error();
      }

      const payload = jwt.verify(token, env.jwtSecret);
      return {
        data: {
          accountId: payload.sub,
        }
      };
    } catch {
      return {
        statusCode: 401,
        body: { message: 'Invalid access token.' }
      };
    }
  }
}
