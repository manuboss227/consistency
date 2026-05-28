import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Register
from "./pages/Register";

import Login
from "./pages/Login";

import Dashboard
from "./pages/Dashboard";

import Tasks
from "./pages/Tasks";

import Navbar
from "./components/Topbar";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// PROTECTED ROUTE
function ProtectedRoute({
  children
}) {

  const token =
    localStorage.getItem(
      "token"
    );

  return token
    ? children
    : <Navigate to="/" />;
}

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"

          element={<Login />}
        />

        <Route
          path="/register"

          element={<Register />}
        />

        <Route
          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"

          element={

            <ProtectedRoute>

              <Tasks />

            </ProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;