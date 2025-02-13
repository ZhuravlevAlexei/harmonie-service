import { Router } from 'express';

import { ctrlWrapper } from 'utils/ctrlWrapper';
import { seedTheBaseController } from 'controllers/goods';

const router = Router();

router.post('/seed', ctrlWrapper(seedTheBaseController));

export default router;
