import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
    name: string;
    role: string;
    bio: string;
    location?: string;
    email?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        portfolio?: string;
    };
}

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