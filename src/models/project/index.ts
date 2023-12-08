import { NewProjectDocument } from '../@types';
import { Project } from './project.entity';

export const addProject = async (project: NewProjectDocument) => {
  try {
    const newProject = new Project();
    await newProject.save();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProjectByWalletAddress = async (walletAddress: string) => {
  try {
    const get = await Project.find({ walletAddress });
    return Promise.resolve(get);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProjectByProjectId = async (projectId: string) => {
  try {
    const get = await Project.findOne({ projectId });
    return Promise.resolve(get);
  } catch (error) {
    return Promise.reject(error);
  }
};
