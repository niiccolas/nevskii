import { Request, Response, NextFunction } from 'express';

export const checkAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { isAdmin } = req.user;
  console.log(req.user);

  if (!isAdmin) return res.status(403).send({ message: 'Access denied' });

  next();
};
