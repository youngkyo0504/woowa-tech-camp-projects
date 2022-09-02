import { OAuthOriginType, OAuthBaseUrlEnum } from '@customTypes/auth';
import { CLIENT_URL } from '@constants/env';
import { OAUTH_SCOPE } from '@constants/policy';
import { makeQueryString } from './queryParser';

export function redirectToOAuthUrl(oAuthOrigin: OAuthOriginType) {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  if (!clientId) {
    throw new Error('Cannot find client id');
  }

  const oAuthUrl = makeOAuthUrl(oAuthOrigin, clientId);
  window.location.href = oAuthUrl;
}

function makeOAuthUrl(oAuthOrigin: OAuthOriginType, clinetId: string) {
  const oAuthUrl = OAuthBaseUrlEnum[oAuthOrigin];

  const queryConfig = {
    scope: OAUTH_SCOPE,
    client_id: clinetId,
    redirect_uri: `${CLIENT_URL}/oauth-redirect?origin=${oAuthOrigin}`,
  };

  const queryString = makeQueryString(queryConfig);
  return oAuthUrl + queryString;
}
