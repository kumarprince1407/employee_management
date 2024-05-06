//Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployeeDetails from "../components/AddEmployeeDetails";
import EditEmployeeDetails from "../components/EditEmployeeDetails";
import Dashboard from "../components/Dashboard";
import LoginRegister from "../components/LoginRegister";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import EmployeeDetails from "../components/EmployeeDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login page={true} />} /> */}
        <Route path="/login" element={<LoginRegister />} />

        {/* <Route path="/register" element={<Login page={false} />} /> */}
        <Route path="/register" element={<LoginRegister />} />

        {/* <Route path="/" element={<AddEmployeeDetails />} /> */}
        <Route path="/" element={<AddEmployee />} />
        <Route path="/home" element={<Dashboard />} />
        {/* <Route path="/edit/:id" element={<EditEmployeeDetails />} /> */}
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
