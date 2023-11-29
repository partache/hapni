import {Features} from "../models/features";
import {environment} from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

const FEATURE_URLS: Record<Features, string> = {
  [Features.USERS]: 'users',
  [Features.POSTS]: 'posts'
}

export const apiUrlFeature = (feature: Features) => (endpoint: string) => `${API_BASE_URL}/${FEATURE_URLS[feature]}/${endpoint}`;
