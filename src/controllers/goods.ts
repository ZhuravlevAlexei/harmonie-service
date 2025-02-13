import { Request, Response } from 'express';
import { seedTheBaseService } from 'services/goods';

export const seedTheBaseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const seedResults = await seedTheBaseService();

  res.status(201).json({
    status: 201,
    message: `Successfully seeded the base! Created: ${seedResults.created}, Updated: ${seedResults.updated}.`,
  });
};
