import { Router } from 'express';

import goodsRouter from './goods';
// import authRouter from './auth.js';

const router = Router();

router.use('/goods', goodsRouter);
// router.use('/auth', authRouter);

export default router;
