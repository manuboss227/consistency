import React from "react";

import {

  BrowserRouter,

  Routes,

  Route,

  Navigate,

  useLocation

} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Tasks from "./pages/Tasks";



import Topbar from "./components/Topbar";

import {

  ToastContainer

} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


// PROTECTED ROUTE
function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  return token

    ? children

    : <Navigate to="/" />;
}


// APP CONTENT
function AppContent() {

  const location = useLocation();

  // HIDE NAVBAR ON LOGIN & REGISTER
  const hideNavbar =

    location.pathname === "/" ||

    location.pathname === "/register";

  return (

    <>

      {
        !hideNavbar && <Topbar />
      }

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

    </>
  );
}


// MAIN APP
function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;