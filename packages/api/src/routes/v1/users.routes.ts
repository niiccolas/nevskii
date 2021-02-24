import { Router } from 'express';

import {
  getUserById,
  getUsers,
  getCurrentUser,
  editCurrentUser,
  deleteUserById,
  editUserById,
  register,
} from '../../controllers/users.controller';
import { authorize } from '../../middleware/auth';
import { checkAdminRole } from '../../middleware/roles';

const router = Router();

/* PUBLIC
ROUTE */
router.post('/register', register);

/* AUTHORIZED
ROUTES */
router.use(authorize);
router.get('/me', getCurrentUser);
router.patch('/me', editCurrentUser);

/* AUTHORIZED AND ADMIN ONLY
ROUTES */
router.use(checkAdminRole);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/:id', editUserById);
router.delete('/:id', deleteUserById);

export default router;
