import React from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Topbar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (

    <nav
      style={{

        background: "#111827",

        padding: "15px 30px",

        display: "flex",

        justifyContent:
          "space-between",

        alignItems:
          "center",

        flexWrap: "wrap"
      }}
    >

      {/* LOGO */}

      <h2
        style={{
          color: "white"
        }}
      >

        TaskForge 🚀

      </h2>

      {/* LINKS */}

      <div
        style={{

          display: "flex",

          gap: "20px",

          alignItems:
            "center",

          flexWrap: "wrap"
        }}
      >

        <Link
          to="/dashboard"

          style={linkStyle}
        >

          Dashboard

        </Link>

        <Link
          to="/tasks"

          style={linkStyle}
        >

          Tasks

        </Link>

        <button

          onClick={logout}

          style={logoutStyle}
        >

          Logout

        </button>

      </div>

    </nav>
  );
}

// LINK STYLE
const linkStyle = {

  color: "white",

  textDecoration: "none",

  fontSize: "16px"
};

// LOGOUT BUTTON
const logoutStyle = {

  background: "#ef4444",

  border: "none",

  color: "white",

  padding: "10px 15px",

  borderRadius: "8px",

  cursor: "pointer"
};

export default Topbar;