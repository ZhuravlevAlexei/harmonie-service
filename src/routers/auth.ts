import { Router } from 'express';
import { ctrlWrapper } from 'utils/ctrlWrapper';
import { registerUserSchema } from '../validation/auth';
import { validateBody } from 'middlewares/validateBody';
import { registerUserController } from 'controllers/auth';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
