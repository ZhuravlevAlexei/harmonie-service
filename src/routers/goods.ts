import { Router } from 'express';

import { ctrlWrapper } from 'utils/ctrlWrapper';
import {
  dailyUpdateTheBaseController,
  fullUpdateTheBaseController,
} from 'controllers/goods';
import { authenticate } from 'middlewares/authenticate';

const router = Router();

router.use(authenticate);
router.post('/daily-update', ctrlWrapper(dailyUpdateTheBaseController));
router.post('/full-update', ctrlWrapper(fullUpdateTheBaseController));

export default router;
