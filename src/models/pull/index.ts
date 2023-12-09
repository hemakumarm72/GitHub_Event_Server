import { Pull } from './pull.entity';

export const addPull = async (pull: any) => {
  try {
    const newProject = new Pull(pull);
    await newProject.save();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPull = async () => {
  try {
    const result = await Pull.find({});
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPullByRepoByProjectId = async (search: object) => {
  try {
    const result = await Pull.find({ ...search });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
