import { Router } from 'express';
import vinyl from './vinyl.routes';

const router = Router();

router.use('/vinyl', vinyl);

export default router;
