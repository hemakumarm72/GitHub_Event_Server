import { PullClose } from './pullClose.entity';

export const addPull = async (pull: any) => {
  try {
    const newProject = new PullClose(pull);
    await newProject.save();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPull = async () => {
  try {
    const result = await PullClose.find({});
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPullByRepoByProjectId = async (search: object) => {
  try {
    const result = await PullClose.find({ ...search });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
