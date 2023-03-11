import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-1fuqws8l5bh3vv8w.us.auth0.com";
  const clientId = "4lnmS5svPxns05HlY5knzbFXRKM1bjwl";

  const history = useNavigate();

  const onRedirectCallback = (appState) => {
    console.log(
      "appState?.returnTo || window.location.pathname",
      appState?.returnTo || window?.location?.pathname
    );
    history(appState?.returnTo || window?.location?.pathname);
  };
  console.log(`${window.location.origin}/callback`);
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/callback`}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
        audience: "covido-tracker",
        scope: "openid profile email read:users update:users",
      }}
      useRefreshTokens={true}
      cacheLocation={"localstorage"}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
