import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { UserDocument } from '../@types';

// declare your schema
export const pullOpenSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    title: { type: String },
    gitHubRepo: { type: String },
    default_branch: { type: String },
  },
  { timestamps: true },
);

// paginate with this plugin

// create the paginated model

// create the paginated model
export const PullOpen = mongoose.model('pullOpen', pullOpenSchema, 'pullOpen');
