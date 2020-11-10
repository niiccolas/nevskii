import { Router, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import vinyl from './vinyl.routes';
import products from './products.routes';
import swagger from './swagger.routes';
import root from './root.routes';

const router = Router();

// Routes
router.use('/vinyl', vinyl);
router.use('/products', products);
router.use('/swagger', swaggerUi.serve, swagger);
router.use('/', root);

// Catch-all
router.all('/*', (_, res: Response) => res.redirect('/'));

export default router;
