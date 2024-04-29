//Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployeeDetails from "../components/AddEmployeeDetails";
import EditEmployeeDetails from "../components/EditEmployeeDetails";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login page={true} />} /> */}
        <Route path="/login" element={<Login />} />

        {/* <Route path="/register" element={<Login page={false} />} /> */}
        <Route path="/register" element={<Login />} />

        {/* <Route path="/" element={<AddEmployeeDetails />} /> */}
        <Route path="/" element={<AddEmployee />} />
        <Route path="/home" element={<Dashboard />} />
        {/* <Route path="/edit/:id" element={<EditEmployeeDetails />} /> */}
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
