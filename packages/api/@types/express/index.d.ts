// import * as express from 'express';
import { JwtPayload } from '../../src/helpers/types';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
