//Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployeeDetails from "../components/AddEmployeeDetails";
import EditEmployeeDetails from "../components/EditEmployeeDetails";
import Dashboard from "../components/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddEmployeeDetails />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditEmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
