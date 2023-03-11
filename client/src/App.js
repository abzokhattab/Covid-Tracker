import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Form from "./components/Form.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Form />
      <div>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
