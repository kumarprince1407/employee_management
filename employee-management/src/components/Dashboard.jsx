//Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeDetails, deleteEmployee } from "../redux/actions";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteTwoTone } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store";

import { getAuth, signOut } from "firebase/auth"; //To hanlde Signout
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employeeData = useSelector(
    (state) => state.employeeManagementData || []
  );

  useEffect(() => {
    console.log("Employee data: ", employeeData);
    dispatch(fetchEmployeeDetails());
  }, [dispatch]); //Ensure data is fetched initially

  //Delete
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        //Sign-out successfull
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error during logout: ", error);
      });
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
              {employeeData.map((employee, index, id) => (
                // TODO - Change key to an appropriate value
                <tr key={employee.userid}>
                  <td>{index + 1}</td>
                  <td>{employee.userid}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.date}</td>
                  <td>
                    <EditIcon
                      onClick={() => navigate(`/edit/${employee.id}`)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Delete onClick={() => handleDelete(employee.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            variant="contained"
            color="success"
            id="button2 "
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
