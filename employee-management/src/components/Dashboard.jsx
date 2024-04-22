//Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeDetails, deleteEmployee } from "../redux/actions";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store";
function Dashboard() {
  const navigate = useNavigate();

  const employeeData = useSelector(
    (state) => state.employeeManagementData || []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Employee data: ", employeeData);
    dispatch(fetchEmployeeDetails());
  }, [dispatch]); //check

  //Delete
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">Employee Details</h2>
          <Button
            variant="contained"
            color="success"
            id="button2"
            onClick={() => navigate("/")}
          >
            Add New Employee
          </Button>
        </div>
      </div>
      <div className="mainContainer">
        <div className="displayContents">
          <table className="table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <br />
            <tbody>
              {employeeData.map((listContent, index, id) => (
                // TODO - Change key to an appropriate value
                <tr key={listContent.userid}>
                  <td>{index + 1}</td>
                  <td>{listContent.userid}</td>
                  <td>{listContent.firstName}</td>
                  <td>{listContent.lastName}</td>
                  <td>{listContent.email}</td>
                  <td>{listContent.salary}</td>
                  <td>{listContent.date}</td>
                  <td>
                    <EditIcon
                      onClick={() => navigate(`/edit/${listContent.id}`)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Delete onClick={() => handleDelete(listContent.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
