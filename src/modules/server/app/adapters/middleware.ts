import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../presentation/protocols";

export const middleware = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const response = await controller.handle({
      body: req.body,
      files: req.files,
      params: req.params,
    });

    if (response.status != 200) {
      return res.status(response.status).json(response.body);
    }

    next();
  };
};
