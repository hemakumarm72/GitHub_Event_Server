import e, { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../../middleware/requestHandle';
import { addProject, getProjectByProjectId, getProjectByWalletAddress } from '../../models/project';
import { NewProjectDocument } from '../../models/@types';
import { generatedId } from '../../utils/randomId';
import { LINK } from '../../config/env';
import { badImplementationException } from '../../utils/apiErrorHandler';
import { addPull, getPullByRepoByProjectId } from '../../models/pull';
import { getWallet } from '../../models/user';

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
    const data = JSON.parse(req.body.payload);
    console.log(data.action);
    switch (data?.action) {
      case 'closed':
        await addPullData(data, projectId, 'closed');
        break;
      case 'opened':
        await addPullData(data, projectId, 'opened');
        break;
      default:
        console.log('not match');
        break;
    }
    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const addPullData = async (data: any, projectId: string, type: 'opened' | 'closed') => {
  try {
    const body = data;

    const add = {
      title: body.pull_request.title,
      username: body.pull_request.user.login,
      projectId,
      type,
      gitHubRepo: body.pull_request.base.repo.html_url,
      default_branch: body.pull_request.base.repo.default_branch,
    };
    await addPull(add);
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getPullData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const { type } = req.query;

    if (type !== 'opened' && type !== 'closed') throw badImplementationException('types not match');

    const search = {
      projectId,
      type: 'opened',
    };
    const result = await getPullByRepoByProjectId(search);
    return handleResponse(res, 200, { result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getPullByWalletAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, walletAddress } = req.params;
    const { type } = req.query;
    const user = await getWallet(walletAddress);
    if (!user) throw badImplementationException('user  does not exits');

    if (type !== 'opened' && type !== 'closed') throw badImplementationException('types not match');

    const getPull = await getPullByRepoByProjectId({ projectId, username: user.username, type });
    return handleResponse(res, 200, { getPull });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
