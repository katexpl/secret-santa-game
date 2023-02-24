import WelcomeScreen from "./pages/welcomeScreen";
import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecretSanta from "./pages/secretSanta";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/secret-santa" element={<SecretSanta />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
