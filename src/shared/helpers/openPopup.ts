import { POPUP_HEIGHT, POPUP_WIDTH } from '@/shared/constants';

export const openOAuthPopup = (authUrl: string): Window | null => {
  const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2;
  const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2;

  return window.open(
    authUrl,
    'oauth_popup',
    `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},toolbar=no,menubar=no`,
  );
};
