import { ONE_DAY } from '../constants/index';
import { Request, Response } from 'express';
import {
  updateTheBaseService,
  updateTheProductsDataService,
} from 'services/goods';

export const fullUpdateTheBaseController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const veryOldDateISO = new Date('2015-01-01T00:00:00.000Z')
    .toISOString()
    .split('.')[0];

  const updateResults = await updateTheBaseService(veryOldDateISO);

  res.status(201).json({
    status: 201,
    message: updateResults.message,
  });
};

export const dailyUpdateTheBaseController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const currentData = new Date();
  const aDayAgoDate = new Date(currentData.getTime() - ONE_DAY);
  const aDayAgoDateISO = aDayAgoDate.toISOString().split('.')[0];

  const updateResults = await updateTheBaseService(aDayAgoDateISO);

  res.status(201).json({
    status: 201,
    message: updateResults.message,
  });
};

export const productsDataUpdateController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const updateResults = await updateTheProductsDataService();

  res.status(201).json({
    status: 201,
    message: updateResults.message,
  });
};
