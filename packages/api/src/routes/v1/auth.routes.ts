import { Router } from 'express';

import {
  // changePassword,
  login,
  logout,
  invalidateRefreshToken,
  refreshToken,
} from '../../controllers/auth.controller';

import { authorize } from '../../middleware/auth';
import { checkAdminRole } from '../../middleware/roles';

const router = Router();

/* PUBLIC
ROUTES */
router.post('/login', login);
router.post('/token/refresh', refreshToken);

/* AUTHORIZED
ROUTES */
router.use(authorize);
router.delete('/logout', logout);

/* AUTHORIZED AND ADMIN ONLY
ROUTES */
router.use(checkAdminRole);
router.post('/token/invalidate', invalidateRefreshToken);

export default router;
