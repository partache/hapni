import {model, Schema, Types} from 'mongoose';

export interface User {
    _id: Types.ObjectId;
    name: string;
    email: string;
    hashedPassword: string;
    accessToken: string;
}

export type PartialUser = Omit<User, 'hashedPassword' | 'name'>;

const EMAIL_PATTERN = /^([a-zA-Z0-9_.+-]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {
        type: String, required: [true, 'Email is required'],
        validate: {
            validator(value: string) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid'
        }
    },
    hashedPassword: {type: String, required: true},
});

userSchema.index({email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

export const UserModel = model<User>('User', userSchema);