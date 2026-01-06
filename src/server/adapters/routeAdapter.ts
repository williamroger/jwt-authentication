import { Request, Response } from "express";
import { IController } from "../../application/interfaces/IController";

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    console.log('request ', request);
    const { statusCode, body } = await controller.handle({
      body: request.body,
      accountId: request.accountId
    });

    response.status(statusCode).json(body);
  }
}
