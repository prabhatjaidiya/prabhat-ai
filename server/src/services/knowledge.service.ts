import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Learning from "../models/Learning.js";

type KnowledgeResult = {
    profile: unknown;
    skills: unknown[];
    projects: unknown[];
    learning: unknown[];
};

export async function retrieveKnowledge(
    message: string
): Promise<KnowledgeResult> {
    const question = message.toLowerCase();

    const knowledge: KnowledgeResult = {
        profile: null,
        skills: [],
        projects: [],
        learning: [],
    };

    if (
        question.includes("who is prabhat") ||
        question.includes("profile") ||
        question.includes("about prabhat")
    ) {
        knowledge.profile = await Profile.findOne().lean();
    }

    if (
        question.includes("skill") ||
        question.includes("technology") ||
        question.includes("technologies") ||
        question.includes("know") ||
        question.includes("work with")
    ) {
        knowledge.skills = await Skill.find().lean();
    }

    if (
        question.includes("project") ||
        question.includes("built") ||
        question.includes("build") ||
        question.includes("developed")
    ) {
        knowledge.projects = await Project.find().lean();
    }

    if (
        question.includes("learning") ||
        question.includes("learn") ||
        question.includes("currently learning") ||
        question.includes("roadmap") ||
        question.includes("progress") ||
        question.includes("mern") ||
        question.includes("currently working on")
    ) {
        knowledge.learning = await Learning.find().lean();
    }

    return knowledge;
}