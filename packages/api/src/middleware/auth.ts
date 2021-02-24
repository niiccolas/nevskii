import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { JwtPayload } from '../helpers/types';

const { ACCESS_TOKEN_SECRET } = process.env;

/**
 * Authorize access given a valid JWT token.
 * Different from "authentication" which is about validating username/password
 * Grants access to next middleware function, given a valid JWT in custom 'x-access-token' header. Passes JWT's payload to `req.user`
 * @param req
 * @param res
 * @param next
 */
export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> => {
  const accessToken = req.header('x-access-token') as string;
  const refreshToken = req.header('x-refresh-token') as string;
  if (!accessToken || !refreshToken)
    return res.status(401).send({ error: 'Access denied. No token provided' });

  try {
    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET!);
    req.user = payload as JwtPayload;
    next();
  } catch (error) {
    /**
     * ! when auth comes from a /logout request,
     * ! bypass Access Token expiration
     * ! and move to next() passing JWT payload to req.user
     */
    if (
      error.name === 'TokenExpiredError' &&
      req.originalUrl.includes('/auth/logout')
    ) {
      req.user = jwt.decode(ACCESS_TOKEN_SECRET!) as JwtPayload;
      next();
    } else {
      res.status(400).send({
        message:
          error.name === 'TokenExpiredError'
            ? 'Access Token Expired'
            : 'Invalid token',
        error,
      });
    }
  }
};
