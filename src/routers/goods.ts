import { Router } from 'express';

import { ctrlWrapper } from 'utils/ctrlWrapper';
import {
  dailyUpdateTheBaseController,
  fullUpdateTheBaseController,
  // seedTheBaseController,
  // updateTheBaseController,
} from 'controllers/goods';

const router = Router();

// router.post('/seed', ctrlWrapper(seedTheBaseController)); // только для крайнего случая или тестирования, данные не полные
router.post('/daily-update', ctrlWrapper(dailyUpdateTheBaseController));
router.post('/full-update', ctrlWrapper(fullUpdateTheBaseController));

export default router;
