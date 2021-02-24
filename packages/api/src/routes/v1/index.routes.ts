import { Router, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import products from './products.routes';
import swagger from './swagger.routes';
import root from './root.routes';
import auth from './auth.routes';
import users from './users.routes';

const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/products', products);
router.use('/swagger', swaggerUi.serve, swagger);
router.use('/', root);

// Catch-all
router.all('/*', (_, res: Response) => res.redirect('/'));

export default router;
