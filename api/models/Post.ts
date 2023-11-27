import {model, Schema, Types} from 'mongoose';

export interface Post {
    _id: Types.ObjectId;
    title: string;
    description: string;
    createdAt?: Date,
    updatedAt?: Date,
    owner: Types.ObjectId
}

export type PartialPost = Omit<Post, '_id'| 'updatedAt'| ' createdAt'>;

const schema = new Schema<Post>({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Title must be between 1 and 5'],
        maxlength: [50, 'Title must be between 1 and 5']
    },
    description: {
        type: String,
        required: true,
        minlength: [2, 'Description must be between 1 and 5'],
        maxlength: [250, 'Description must be at least 250 characters long']
    },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

export const PostModel = model<Post>('Post', schema);

