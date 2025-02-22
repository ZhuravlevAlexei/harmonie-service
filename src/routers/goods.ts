import { Router } from 'express';

import { ctrlWrapper } from 'utils/ctrlWrapper';
import {
  dailyUpdateTheBaseController,
  fullUpdateTheBaseController,
  // seedTheBaseController,
} from 'controllers/goods';
import { authenticate } from 'middlewares/authenticate';

const router = Router();

router.use(authenticate);
// router.post('/seed', ctrlWrapper(seedTheBaseController)); // только для крайнего случая или тестирования, данные не полные
router.post('/daily-update', ctrlWrapper(dailyUpdateTheBaseController));
router.post('/full-update', ctrlWrapper(fullUpdateTheBaseController));

export default router;
