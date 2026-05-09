import { OAuthProvider } from '../types';

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AUTHORIZE_URL: Record<OAuthProvider, string> = {
  google: `${BASE_API_URL}/auth/oauth/integrations/google/authorize`,
};
