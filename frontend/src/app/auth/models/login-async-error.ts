import {Features} from "../../shared/models/features";

export type LoginAsyncError = {
  unknownServerError?: boolean;
  invalidPasswordOrUser?: boolean;
  passwordMismatch?: true;
  emailNotValid?: true,
}

export enum LoginAsyncErrors{
  unknownServerError= 'unknownServerError',
  invalidPasswordOrUser = 'invalidPasswordOrUser',
  passwordMismatch = 'passwordMismatch',
  emailNotValid = 'emailNotValid',
}

const FORM_ASYNC_ERRORS: Record<LoginAsyncErrors, string> = {
  [LoginAsyncErrors.unknownServerError]: 'Try out after some minutes',
  [LoginAsyncErrors.invalidPasswordOrUser]: 'Invalid email or password is not valid',
  [LoginAsyncErrors.emailNotValid]: 'Email is not valid',
  [LoginAsyncErrors.passwordMismatch]: 'Passwords do not match',
}

export const validationMessage = (asyncError: LoginAsyncErrors) => `${FORM_ASYNC_ERRORS[asyncError]}`;
