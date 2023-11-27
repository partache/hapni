import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {PartialUser, User, UserModel} from "../models/User";

const JWT_SECRET: string = process.env["JWT_SECRET "] as string;
const blacklist: string[] = [];

export async function register(email: string, password: string) {
    const existing = await UserModel.findOne({email: new RegExp(`^${email}$`, 'i')});

    if (existing) {
        throw new Error('Email already exists');
    }

    const user = new UserModel({
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    });

    await user.save();

    return createSession(user);
}

export async function login(email: string, password: string) {
    const user: User | null = await UserModel.findOne({email: new RegExp(`^${email}$`, 'i')});

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return createSession(user);
}

export function logout(token: string) {
    blacklist.push(token);
}

function createSession(user: User): PartialUser {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    };
}

export function verifySession(accessToken: string): PartialUser {
    if (blacklist.includes(accessToken)) {
        throw new Error('Token is invalidated');
    }

    const payload = jwt.verify(accessToken, JWT_SECRET) as JwtPayload;

    return {
        email: payload.email,
        _id: payload._id,
        accessToken
    };
}
