import { firebaseAuth } from "@/services/firebase/initializer";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AccountCircleOutlined, Person } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.styles.css";

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const handleUserSignOut = () => {
    signOut(firebaseAuth).then(() => console.log("user signed out"));
  };
  return (
    <nav className="side-bar">
      <div className="links">
        <Typography variant="h4" fontWeight={800}>
          Meal.me
        </Typography>
        <ul>
          <NavLink
            to="/"
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
        </ul>
      </div>

      <footer className="nav-footer">
        {currentUser ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <Person />
            </Avatar>
            <NavLink
              to="#"
              onClick={handleUserSignOut}
              className={({ isActive }) =>
                isActive ? "activeLink" : "nav-link"
              }
              style={{ height: "35px" }}
            >
              Sign Out
            </NavLink>
          </Box>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "activeLink" : "nav-link")}
          >
            Login
          </NavLink>
        )}
        <Typography variant="caption" className="copyright">
          Copyright ©{new Date().getFullYear()} All rights reserved
          {/* | This
          website is made by{" "}
          <a
            href="https://www.linkedin.com/in/gabriel-hammer/"
            rel="noreferrer"
            target="_blank"
            className="copyright__linkedin-link"
          >
            Gabriel Hammer.
          </a> */}
        </Typography>
      </footer>
    </nav>
  );
};

export default Sidebar;
