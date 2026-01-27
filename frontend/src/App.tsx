import Hero from "./pages/hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import Layout from "./components/Layout";
import Board from "./pages/boards";
import Task from "./pages/tasks";


function App() {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Hero />} key="hero" />
        <Route path="/login" element={<Login />} key="login" />
        <Route path="/signUp" element={<SignUp />} key="signUp" />
        {/* protected routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} key="dashboard" />
          <Route path="board" element={<Board/>} key="board" />
          <Route path="task" element={<Task/>} key="task" />
          <Route path="inbox" element={<h1>Calendar Page</h1>} key="inbox" />
          <Route path="calendar" element={<h1>Calendar Page</h1>} />
          <Route path="search" element={<h1>Search Page</h1>} />
          <Route path="settings" element={<h1>Settings Page</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
