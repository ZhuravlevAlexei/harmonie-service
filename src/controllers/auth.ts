import { Request, Response } from 'express';
import { registerUser } from 'services/auth';
export const registerUserController = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};
