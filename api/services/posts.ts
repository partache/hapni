import {PartialPost, PostModel} from "../models/Post";

export function getAll() {
    return PostModel.find({});
}

export async function getOwnersPosts(ownerId: string) {
    const posts = PostModel.find({owner: ownerId});
    return posts;
}

export async function create(post: PartialPost) {
    const result = new PostModel(post);
    await result.save();

    return result;
}

export function getById(id: string) {
    return PostModel.findById(id).populate('owner');
}

export async function update(id: string, post: PartialPost) {
    const existing = await PostModel.findById(id);

    if (!existing) {
        throw new Error("No post with this id")
    }

    existing.title = post.title;
    existing.description = post.description;

    await existing.save();

    return existing;
}

export async function deleteById(id: string) {
    await PostModel.findByIdAndDelete(id);
}


