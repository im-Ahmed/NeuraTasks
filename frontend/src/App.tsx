import Hero from "./pages/hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import TestScreen from "./pages/TestScreen";
import Board from "./pages/boards";
import Task from "./pages/tasks";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import MyTask from "./pages/MyTask";

function App() {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Hero />} key="hero" />
        <Route path="/login" element={<Login />} key="login" />
        <Route path="/signUp" element={<SignUp />} key="signUp" />
        {/* protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} key="dashboard" />
          <Route path="inbox" element={<h1>Inbox</h1>} key="inbox" />{" "}
          <Route path="board" element={<Board />} key="board" />
          <Route path="task" element={<Task />} key="task" />
          <Route path="my-tasks" element={<MyTask/>} />
          <Route path="search" element={<h1>Search Page</h1>} />
          <Route path="settings" element={<h1>Settings Page</h1>} />
        </Route>
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["member"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} key="user-dashboard" />
          <Route path="my-tasks" element={<MyTask/>} />
        </Route>
        <Route path="test" element={<TestScreen />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
