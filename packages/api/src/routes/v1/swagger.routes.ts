import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../swagger.json';

const router = Router();

router.get('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default router;
