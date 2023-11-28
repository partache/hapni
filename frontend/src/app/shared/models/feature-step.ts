import {UserStep} from "../../auth/login/models/user-step";
import {HomeStep} from "./home-step";

export type FeatureStep =
  UserStep
  | HomeStep;
