import { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../../middleware/requestHandle';
import { addProject, getProjectByProjectId, getProjectByWalletAddress } from '../../models/project';
import { NewProjectDocument } from '../../models/@types';
import { generatedId } from '../../utils/randomId';

export const addProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { walletAddress, gitHubLink, projectName, dueDate, stackingAmount, perSharePrice, limitParticipant } =
      req.body;
    const project: NewProjectDocument = {
      projectId: generatedId(),
      walletAddress,
      gitHubLink,
      projectName,
      dueDate,
      stackingAmount,
      perSharePrice,
      limitParticipant,
    };
    await addProject(project);
    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const getProjectByAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { walletAddress } = req.params;
    const getProject = await getProjectByWalletAddress(walletAddress);
    return handleResponse(res, 200, { getProject });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const projectListening = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const projectSearch = await getProjectByProjectId(projectId);
    if (!projectSearch) throw new Error('1004'); // TODO: Project Id not found
    const data = req.body;
    console.log(data);
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
