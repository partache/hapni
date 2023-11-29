import {Features} from "../../shared/models/features";

export type LoginAsyncError = {
  unknownServerError?: boolean;
  invalidPasswordOrUser?: boolean;
  passwordMismatch?: boolean;
  emailNotValid?: boolean,
  minLength?: boolean,
  invalidImageUrl?: boolean
}

export enum LoginAsyncErrors{
  unknownServerError= 'unknownServerError',
  invalidPasswordOrUser = 'invalidPasswordOrUser',
  passwordMismatch = 'passwordMismatch',
  emailNotValid = 'emailNotValid',
  minLength = 'minLength',
  invalidImageUrl = 'invalidImageUrl',
}

const FORM_ASYNC_ERRORS: Record<LoginAsyncErrors, string> = {
  [LoginAsyncErrors.unknownServerError]: 'Try out after some minutes',
  [LoginAsyncErrors.invalidPasswordOrUser]: 'Invalid email or password is not valid',
  [LoginAsyncErrors.emailNotValid]: 'Email is not valid',
  [LoginAsyncErrors.passwordMismatch]: 'Passwords do not match',
  [LoginAsyncErrors.minLength]: 'Minimum charecters are',
  [LoginAsyncErrors.invalidImageUrl]: 'Please provide valid image Url'
}

export const validationMessage = (asyncError: LoginAsyncErrors) => `${FORM_ASYNC_ERRORS[asyncError]}`;
