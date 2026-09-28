import mongoose, { Schema, Document } from "mongoose";

export interface ILearning extends Document {
  topic: string;
  description: string;
  status: string;
  progress: number;
}

const learningSchema = new Schema<ILearning>(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      trim: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Learning = mongoose.model<ILearning>("Learning", learningSchema);

export default Learning;