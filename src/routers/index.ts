import { Router } from 'express';

import authRouter from './auth';
import goodsRouter from './goods';

const router = Router();

router.use('/auth', authRouter);
router.use('/goods', goodsRouter);

export default router;
