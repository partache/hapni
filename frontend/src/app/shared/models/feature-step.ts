import {UserStep} from "../../auth/models/user-step";
import {PostsStep} from "../../features/models/posts-step";

export type FeatureStep =
    UserStep
    | PostsStep;
