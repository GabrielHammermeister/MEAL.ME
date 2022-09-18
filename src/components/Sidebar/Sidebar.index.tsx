import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.styles.css";

const Sidebar = () => {
  // const { currentUser } = useContext(UserContext);

  return (
    <nav className="side-bar">
      <div className="links">
        <Typography variant="h4" fontWeight={800}>
          Meal.me
        </Typography>
        <ul>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "activeLink" : "nav-link")}
          >
            Home
          </NavLink>

          <NavLink
            to="/meals"
            className={({ isActive }) => (isActive ? "activeLink" : "nav-link")}
          >
            Meals
          </NavLink>
          <NavLink
            to="/ingredients"
            className={({ isActive }) => (isActive ? "activeLink" : "nav-link")}
          >
            Ingredients
          </NavLink>

          {/* {currentUser ? (
                        <NavLink to="/sign-out" activeClassName="activeLink">
                            Sign Out
                        </NavLink>
                    ) : (
                        <NavLink to="/login" activeClassName="activeLink">
                            Login
                        </NavLink>
                    )} */}
        </ul>
      </div>

      <footer className="nav-footer">
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "activeLink" : "nav-link")}
        >
          Login
        </NavLink>
        <Typography variant="caption" className="copyright">
          Copyright ©{new Date().getFullYear()} All rights reserved | This
          website is made by{" "}
          <a
            href="https://www.linkedin.com/in/gabriel-hammer/"
            rel="noreferrer"
            target="_blank"
            className="copyright__linkedin-link"
          >
            Gabriel Hammer.
          </a>
        </Typography>
      </footer>
    </nav>
  );
};

export default Sidebar;
