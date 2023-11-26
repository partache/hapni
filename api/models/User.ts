import {model, Schema} from 'mongoose';

export interface User {
    name: number;
    email: string;
    passrword: string;
}

const EMAIL_PATTERN = /^([a-zA-Z0-9_.+-]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {
        type: String, required: [true, 'Email is required'],
        validate: {
            validator(value) {
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

export const User = model<User>('User', userSchema);