import React from "react";
import { Outlet } from "react-router-dom";

const Validator = () => {
  console.log("validacao de login");
  return <Outlet />;
};

export default Validator;
