import { Request, Response } from "express";
import { Controller } from "../../../presentation/protocols";

export function controller(method: Controller) {
  return async (req: Request, res: Response) => {
    const response = await method.handle({
      body: req.body,
      params: req.params,
    });
    res.status(response.status).json(response.body);
  };
}
