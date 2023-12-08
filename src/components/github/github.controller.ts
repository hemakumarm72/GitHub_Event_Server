import { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../../middleware/requestHandle';

export const addProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, gitHubLink, projectName, DueDate, stackingAmount, perSharePrice, limitParticipant } = req.body;

    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
