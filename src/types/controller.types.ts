import { NextFunction, Request, Response } from 'express';

export interface ControllerParams<T> {
  request: Request<T>;
  response: Response;
  next: NextFunction;
}
