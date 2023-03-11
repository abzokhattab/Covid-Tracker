import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";
import NavBar from "./components/NavBar.jsx";
import Form from "./components/From.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  // const config = {
  //   authRequired: false,
  //   auth0Logout: true,
  //   secret: process.env.SECRET,
  //   baseURL: process.env.BASEURL,
  //   clientID: process.env.CLIENTID,
  //   issuerBaseURL: process.env.ISSUERBASEURL,
  // };

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  return (
    <div className="App">
      <NavBar />
      {/* <Auth0Provider
        domain="dev-1fuqws8l5bh3vv8w.us.auth0.com"
        clientId="4lnmS5svPxns05HlY5knzbFXRKM1bjwl"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "covido-tracker",
          scope: "openid profile email read:users update:users",
        }}
        useRefreshTokens={true}
        onRedirectCallback={onRedirectCallback}
        cacheLocation={"localstorage"}
      > */}
      <Form></Form>
      <div>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
        <Dashboard />
      </div>
      {/* </Auth0Provider> */}
    </div>
  );
}

export default App;
