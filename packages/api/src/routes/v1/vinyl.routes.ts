import { Router } from 'express';
import {
  getVinyls,
  createVinyl,
  getVinyl,
  updateVinyl,
  deleteVinyl,
} from '../../controllers/vinyl.controller';

const router = Router();

router.get('/', getVinyls);
router.get('/:id', getVinyl);
router.post('/', createVinyl);
router.put('/:id', updateVinyl);
router.delete('/:id', deleteVinyl);

export default router;
