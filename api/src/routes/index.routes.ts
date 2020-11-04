import { Router } from 'express';
import vinyl from './vinyl.routes';
import products from './products.routes';

const router = Router();

router.use('/vinyl', vinyl);
router.use('/products', products);

export default router;
