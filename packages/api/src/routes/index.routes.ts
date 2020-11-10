import { Router, Request, Response } from 'express';

import v1 from './v1/index.routes';

const DEFAULT_ROUTE = '/v1';
const router = Router();

router.use('/v1', v1);
router.all('/*', (req: Request, res: Response) =>
  res.redirect(DEFAULT_ROUTE + req.originalUrl),
);

export default router;
