import {Post, PostModel} from "../models/Post";
import {Types} from "mongoose";

export function getAll() {
    return PostModel.find({});
}

export async function getOwnersPosts(ownerId: Types.ObjectId) {
    const posts = PostModel.find({owner: ownerId});
    return posts;
}

export async function create(post: Post) {
    const result = new PostModel(post);
    await result.save();

    return result;
}

export function getById(id: Types.ObjectId) {
    return PostModel.findById(id).populate('owner');
}

export async function update(id: Types.ObjectId, post: Post) {
    const existing = await PostModel.findById(id);

    if (!existing) {
        throw new Error("No post with this id")
    }

    existing.title = post.title;
    existing.description = post.description;

    await existing.save();

    return existing;
}

export async function deleteById(id: Types.ObjectId) {
    await PostModel.findByIdAndDelete(id);
}


