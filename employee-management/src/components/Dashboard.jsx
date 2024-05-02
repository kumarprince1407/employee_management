//Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeDetails, deleteEmployee } from "../redux/actions";
import { AccountCircle, Delete } from "@mui/icons-material";
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
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store";

import "./style.css";
import Header from "./Header";

import { getAuth, signOut } from "firebase/auth"; //To hanlde Signout
//change
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";

//Initialize firebase
initializeApp(firebaseConfig);

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //MUI
  const [auth, setAuth] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //
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
            sx={{ background: "darkblue" }}
            id="button2"
            onClick={() => navigate("/")}
          >
            Add New Employee
          </Button>

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
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
                    {/* <td>{employee.lastName}</td> */}
                    <StyledTableCell>{employee.email}</StyledTableCell>
                    {/* <td>{employee.salary}</td> */}
                    {/* <td>{employee.date}</td> */}
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
