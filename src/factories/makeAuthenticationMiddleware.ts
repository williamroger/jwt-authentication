import { IMiddleware } from "../application/interfaces/IMiddleware";
import { AuthenticationMiddleware } from "../application/middlewares/AuthenticationMiddleware";

export function makeAuthenticationMiddleware(): IMiddleware {
  return new AuthenticationMiddleware();
}
