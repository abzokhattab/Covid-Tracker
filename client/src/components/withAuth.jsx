import React, { useState, useEffect } from 'react';
import auth0 from 'auth0-js';

const auth = new auth0.WebAuth({
  domain: 'dev-1fuqws8l5bh3vv8w.us.auth0.com',
  clientID: '4lnmS5svPxns05HlY5knzbFXRKM1bjwl',
  redirectUri: `${window.location.origin}/callback`,
  responseType: 'token id_token',
  scope: 'openid',
});
const withAuth = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Check if the user is already authenticated
      if (localStorage.getItem('access_token') && localStorage.getItem('id_token')) {
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem('user')));
      } else {
        // Redirect to the Auth0 login page if not authenticated
        auth.authorize();
      }
    }, []);

    useEffect(() => {
      // Handle the authentication callback
      const handleAuthentication = (hash) => {
        auth.parseHash({ hash }, (err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            // Save the tokens to localStorage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);

            // Fetch the user's profile
            auth.client.userInfo(authResult.accessToken, (err, user) => {
              localStorage.setItem('user', JSON.stringify(user));
              setIsAuthenticated(true);
              setUser(user);
            });
          } else if (err) {
            console.error(err);
          }
        });
      };

      // Check if the URL hash fragment contains the tokens
      if (window.location.hash && !isAuthenticated) {
        handleAuthentication(window.location.hash);
        window.history.replaceState({}, document.title, '/');
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent isAuthenticated={isAuthenticated} user={user} {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
