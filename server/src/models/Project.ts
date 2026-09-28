import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
}

const projectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        technologies: {
            type: [String],
            default: [],
        },

        githubUrl: {
            type: String,
            trim: true,
        },

        liveUrl: {
            type: String,
            trim: true,
        },

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;