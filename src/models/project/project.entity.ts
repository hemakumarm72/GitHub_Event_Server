import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ProjectDocument } from '../@types';

// declare your schema
export const projectSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true },
    contractAddress: { type: String },
    projectId: { type: String, unique: true, required: true },
    gitHubLink: { type: String, required: true },
    projectName: { type: String, required: true },
    dueDate: { type: Date, default: Date },
    stackingAmount: { type: Number, default: 0 },
    mileStoneNo: { type: Number, default: 0 },
    perSharePrice: { type: Number, default: 0 },
    limitParticipant: { type: Number, min: 4, default: 4 },
  },
  { timestamps: true },
);

// paginate with this plugin

// create the paginated model
projectSchema.plugin(paginate);

// create the paginated model
export const Project = mongoose.model<ProjectDocument, mongoose.PaginateModel<ProjectDocument>>(
  'project',
  projectSchema,
  'project',
);
