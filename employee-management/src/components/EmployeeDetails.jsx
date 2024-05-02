import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEmployee, updateDetails } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function EmployeeDetails({ employeeData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams(); //Getting the 'id' from the URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3004/employeedetails/${id}`) //Fetch the employee data
        .then((response) => {
          setEmployee(response.data); //Store the employee data
        })
        .catch((error) => {
          console.log("Error fetching employee details:", error);
        });
    }
  }, [id]); //Ensuring data is fetched based on id

  if (!employee) {
    return <div>Loading... </div>; //Display while fetching data
  }

  //Delete
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    navigate(`/home`);
  };

  return (
    <React.Fragment>
      <div className="headingContainer">
        <h2>Detailed employee information for: {employee.firstName}</h2>
        <Button
          variant="contained"
          // color="success"
          id="button2"
          sx={{ background: "darkblue" }}
          onClick={() => navigate(`/home`)}
        >
          Home
        </Button>
      </div>

      <div className="mainContainer">
        <div className="displayContents">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">{employee.userid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">First name</TableCell>
                <TableCell align="left">{employee.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Last name</TableCell>
                <TableCell align="left">{employee.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">{employee.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Salary</TableCell>
                <TableCell align="left">{employee.salary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Date of Joining</TableCell>
                <TableCell align="left">{employee.date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Actions</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ background: "0073E6" }}
                    onClick={() => navigate(`/edit/${employee.id}`)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="contained"
                    style={{ background: "0073E6" }}
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EmployeeDetails;
