import { Router } from 'express';

import goodsRouter from './goods';

const router = Router();

router.use('/goods', goodsRouter);

export default router;
