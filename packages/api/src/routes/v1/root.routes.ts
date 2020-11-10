import { Router, Request, Response } from 'express';

const router = Router();

router.all('/', (req: Request, res: Response) =>
  res.send({
    name: 'nevskii-API',
    version: '1.0.0',
    documentation:
      req.protocol + '://' + req.get('host') + req.baseUrl + '/swagger',
  }),
);

export default router;
