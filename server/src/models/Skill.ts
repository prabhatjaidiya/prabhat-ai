import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
    name: string;
    category: string;
    level: string;
}

const skillSchema = new Schema<ISkill>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        level: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;