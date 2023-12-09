import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { UserDocument } from '../@types';

// declare your schema
export const pullCloseSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    title: { type: String },
    projectId: { type: String },
    type: { type: String, enum: ['opened', 'closed'], default: 'opened' },
    gitHubRepo: { type: String },
    default_branch: { type: String },
  },
  { timestamps: true },
);

// paginate with this plugin

// create the paginated model

// create the paginated model
export const Pull = mongoose.model('pull', pullCloseSchema, 'pull');
