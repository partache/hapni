export interface User {
  _id:string;
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  accessToken: string;
}

export type AuthUser =  Omit<User, 'hashedPassword' | 'name'>;
