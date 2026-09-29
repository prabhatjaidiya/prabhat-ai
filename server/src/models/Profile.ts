import mongoose, { Schema, Document } from "mongoose";

export interface IEducation {
    degree: string;
    institution: string;
    university?: string;
    status: string;
}

export interface IProfile extends Document {
    name: string;
    role: string;
    bio: string;
    location?: string;
    email?: string;
    education: IEducation[];
    socialLinks?: {
        github?: string;
        linkedin?: string;
        portfolio?: string;
    };
}

const educationSchema = new Schema<IEducation>(
    {
        degree: {
            type: String,
            required: true,
            trim: true,
        },

        institution: {
            type: String,
            required: true,
            trim: true,
        },

        university: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const profileSchema = new Schema<IProfile>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            required: true,
            trim: true,
        },

        bio: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
        },

        education: {
            type: [educationSchema],
            default: [],
        },

        socialLinks: {
            github: String,
            linkedin: String,
            portfolio: String,
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;