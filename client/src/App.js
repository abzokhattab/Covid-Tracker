import Map from "./components/Map.jsx";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      return loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
      });
    }
  });
  return (
    <div className="App">
      <NavBar />
      <div>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
        <Map />
      </div>
    </div>
  );
}

export default App;
