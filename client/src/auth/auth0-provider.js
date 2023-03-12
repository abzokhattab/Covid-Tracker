import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_AUDIENCE,
  REACT_APP_AUTH0_CLIENTID,
} = process.env;

const Auth0ProviderWithHistory = ({ children }) => {
  const navigator = useNavigate();

  const onRedirectCallback = (appState) => {
    navigator(appState?.returnTo || window?.location?.pathname);
  };
  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENTID}
      redirectUri={`${window.location.origin}/callback`}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
        audience: REACT_APP_AUTH0_AUDIENCE,
        scope: "profile email",
      }}
      useRefreshTokens={true}
      cacheLocation={"localstorage"}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
