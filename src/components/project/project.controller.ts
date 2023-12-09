import e, { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../../middleware/requestHandle';
import { addProject, getProjectByProjectId, getProjectByWalletAddress } from '../../models/project';
import { NewProjectDocument } from '../../models/@types';
import { generatedId } from '../../utils/randomId';
import { LINK } from '../../config/env';
import { badImplementationException } from '../../utils/apiErrorHandler';

export const addProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      contractEmail,
      walletAddress,
      contractAddress,
      gitHubLink,
      projectName,
      dueDate,
      stackingAmount,
      perSharePrice,
      mileStoneNo,
    } = req.body;
    const project: NewProjectDocument = {
      projectId: generatedId(),
      contractEmail,
      contractAddress,
      walletAddress,
      gitHubLink,
      projectName,
      dueDate,
      stackingAmount,
      perSharePrice,
      mileStoneNo,
    };
    await addProject(project);

    const link = LINK + `project/${project.projectId}`;
    return handleResponse(res, 200, { link });
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
    if (!projectSearch) throw badImplementationException('1004'); // TODO: Project Id not found
    const data = req.body;
    console.log(JSON.parse(data));
    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
