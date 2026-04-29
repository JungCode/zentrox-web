import { SetContextLink } from '@apollo/client/link/context';

import { getAccessToken } from '../../shared/utils/storage';

const getAuthHeaders = () => {
  const token = getAccessToken();
  return {
    authorization: token ? `Bearer ${token}` : '',
  };
};

const authLink = new SetContextLink((prevContext) => {
  return {
    headers: {
      ...prevContext.headers,
      ...getAuthHeaders(),
    },
  };
});

export { authLink };
