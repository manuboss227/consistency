import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaCalendar,
  FaStickyNote,
  FaCog
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/sidebar.css";



function Sidebar() {
  const { logout } = useContext(AuthContext);
  <button onClick={logout}>
  Logout
</button>
  return (
    <div className="sidebar">
      <h2 className="logo">Consistency</h2>

      <nav>
        <Link to="/">
          <FaHome /> Dashboard
        </Link>

        <Link to="/tasks">
          <FaTasks /> Tasks
        </Link>

        <Link to="/calendar">
          <FaCalendar /> Calendar
        </Link>

        <Link to="/notes">
          <FaStickyNote /> Notes
        </Link>

        <Link to="/settings">
          <FaCog /> Settings
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;