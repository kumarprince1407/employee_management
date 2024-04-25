//AddEmployeeDetails
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";

import { addEmployee } from "../redux/actions";
import store from "../redux/store";

function AddEmployeeDetails({ employeeManagementData, addEmployee }) {
  const [userInput, setUserInput] = useState({
    //id: employeeManagementData.id, //check
    userid: "",
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    date: "",
  });

  const navigate = useNavigate();
  //change
  //   useEffect(() => {
  //     console.log("Updated state: ", employeeManagementData);
  //   }, [employeeManagementData]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = value;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
      userid: userInput.userid,
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      email: userInput.email,
      salary: parseFloat(userInput.salary), // Convert salary to number
      date: userInput.date,
    };

    await addEmployee(newItem);
    console.log("Added new employee: ", newItem);

    //Reset all the fields after submission
    setUserInput({
      userid: "",
      firstName: "",
      lastName: "",
      email: "",
      salary: "", //TODO: Check issue with salary string value
      date: "",
    });
    //
    navigate("/home");
  };

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">Add Employee </h2>
          <Button
            variant="contained"
            color="success"
            id="button"
            onClick={handleButtonClick}
          >
            Home
          </Button>
        </div>

        <div className="mainContainer">
          <div className="inputForm">
            <h3 id="heading2">Enter employee details</h3>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="textarea1">
                <br />
                <TextField
                  label="User ID"
                  className="inputfield"
                  type="text"
                  name="userid"
                  value={userInput.userid}
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </label>
              <br />
              <br />

              <label htmlFor="textarea2">
                <br />
                <TextField
                  label="First name"
                  className="inputfield"
                  type="text"
                  name="firstName"
                  value={userInput.firstName}
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </label>
              <br />
              <br />
              <label htmlFor="textarea3">
                <br />
                <TextField
                  label="Last name"
                  className="inputfield"
                  type="text"
                  name="lastName"
                  value={userInput.lastName}
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </label>
              <br />
              <br />
              <label htmlFor="textarea4">
                <br />
                <TextField
                  label="Email"
                  className="inputfield"
                  type="text"
                  name="email"
                  value={userInput.email}
                  onChange={handleInputChange}
                  sx={{ width: "150%" }}
                />
              </label>
              <br />
              <br />

              <label htmlFor="textarea5">
                <br />
                <TextField
                  label="Salary"
                  className="inputfield"
                  type="number"
                  name="salary"
                  value={userInput.salary}
                  onChange={handleInputChange}
                  sx={{ width: "150%" }}
                />
              </label>
              <br />
              <br />
              <label htmlFor="textarea6">
                <br />
                <TextField
                  label="Date"
                  className="inputfield"
                  type="text"
                  name="date"
                  value={userInput.date}
                  onChange={handleInputChange}
                  sx={{ width: "150%" }}
                />
              </label>
              <br />
              <br />
              <Button
                variant="contained"
                color="success"
                id="button1"
                type="submit"
              >
                Add Employee
              </Button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  employeeManagementData: state.AddEmployeeDetails,
});

const mapDispatchToProps = (dispatch) => ({
  addEmployee: (newEmployee) => dispatch(addEmployee(newEmployee)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeDetails);
