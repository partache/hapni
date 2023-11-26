import {model, Schema, Types} from 'mongoose';

export interface Post {
    title: string;
    description: string;
    date: Date,
    owner: Types.ObjectId
}

const schema = new Schema<Post>({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Title must be between 1 and 5'],
        maxlength: [50, 'Title must be between 1 and 5']
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
        minlength: [2, 'Description must be between 1 and 5'],
        maxlength: [250, 'Description must be at least 250 characters long']
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
});

export const PostModel = model<Post>('Review', schema);

