const ACCESS_TOKEN_KEY = 'zentrox_access_token';
const REFRESH_TOKEN_KEY = 'zentrox_refresh_token';
const EXPIRY_KEY = 'zentrox_token_expires_at';

const isBrowser = typeof window !== 'undefined';

export const setAuthTokens = (
  accessToken: string,
  refreshToken: string,
  options?: { remember?: boolean },
) => {
  if (!isBrowser) {
    return;
  }

  const remember = options?.remember ?? false;
  const expiresAt = remember
    ? Date.now() + 30 * 24 * 60 * 60 * 1000
    : undefined;

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  if (expiresAt) {
    localStorage.setItem(EXPIRY_KEY, String(expiresAt));
  } else {
    localStorage.removeItem(EXPIRY_KEY);
  }
};

export const getAccessToken = () => {
  if (!isBrowser) {
    return null;
  }

  const expiresAt = localStorage.getItem(EXPIRY_KEY);

  if (expiresAt && Number(expiresAt) < Date.now()) {
    clearAuthTokens();
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const clearAuthTokens = () => {
  if (!isBrowser) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};
