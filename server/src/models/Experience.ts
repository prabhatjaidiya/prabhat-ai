import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  role: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);

export default Experience;