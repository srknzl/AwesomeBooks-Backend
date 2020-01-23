import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const isAuth: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies["token"];
  try {
    const decoded : any = jwt.verify(token, "somesupersecretsecret");
    (req as any).userId = decoded.userid;
    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Not logged in";
    next(error);
  }
};
export const isAdminAuth: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies["token"];
  try {
    const decoded : any = jwt.verify(token, "somesupersecretsecret");
    (req as any).userId = decoded.userid;
    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Not logged in";
    next(error);
  }
};
