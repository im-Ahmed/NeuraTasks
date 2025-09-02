import Hero from "./pages/hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} key="hero" />
        <Route path="/login" element={<Login />} key="hero" />
        <Route path="/signUp" element={<SignUp />} key="hero" />
      </Routes>
    </Router>
  );
}

export default App;
