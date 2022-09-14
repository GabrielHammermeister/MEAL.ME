import { Fragment, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.index";
import Meals from "./pages/Meals/Meals.index";
import Validator from "./router/Validator/Validator.index";
import DefaultTemplate from "./templates/Default/Default.index";

function App() {
  return (
    <Fragment>
      <Routes>
        {/* Private Routes */}
        <Route path="/" element={<Validator />}>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="meals" element={<Meals />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
