//Dashboard.jsx
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeDetails, deleteEmployee } from "../redux/actions";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

//change
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store";

import "./style.css";

//change
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";

import Logout from "./Logout";

//Initialize firebase
initializeApp(firebaseConfig);

function Dashboard() {
  const navigate = useNavigate(); //React router hook to navigate b/w routes
  const dispatch = useDispatch(); //Redux hook to dispatch actions

  const employeeData = useSelector(
    (state) => state.employeeManagementData || []
  ); //Using 'useSelector' hook to select 'employeeManagementData' from the Redux store, and providing the data to render in the component

  useEffect(() => {
    console.log("Employee data: ", employeeData);
    dispatch(fetchEmployeeDetails()); //Dispatching Redux action to fetch employee details when the component mounts
  }, []); //Ensure data is fetched initially

  //Delete
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id)); //Dispatching action to delete employee by ID
  };

  // Custom Styled TableCell
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  // Custom Styled TableRow
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // Hide the last row's border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //change
  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h1 id="heading1">Employee Details</h1>
          <Button
            variant="contained"
            // color="success"
            sx={{ background: "darkblue", marginLeft: "5%" }}
            id="button2"
            onClick={() => navigate("/")}
          >
            Add New Employee
          </Button>

          <Logout />
        </div>
      </div>
      <div className="mainContainer">
        <div className="displayContents">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Serial</StyledTableCell>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell>First Name</StyledTableCell>

                  <StyledTableCell>Email</StyledTableCell>

                  <StyledTableCell>More Options</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <br />
              <TableBody>
                {employeeData.map((employee, index, id) => (
                  // TODO - Change key to an appropriate value
                  <StyledTableRow key={employee.userid}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{employee.userid}</StyledTableCell>
                    <StyledTableCell>{employee.firstName}</StyledTableCell>
                    <StyledTableCell>{employee.email}</StyledTableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        style={{ background: "#0073E6", fontSize: "small" }}
                        onClick={() => navigate(`/employee/${employee.id}`)}
                      >
                        Details
                      </Button>
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        onClick={() => navigate(`/edit/${employee.id}`)}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Delete onClick={() => handleDelete(employee.id)} />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
