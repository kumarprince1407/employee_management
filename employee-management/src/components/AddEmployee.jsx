import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material";

import { connect } from "react-redux";

import { addEmployee } from "../redux/actions";

import FormComponent from "./FormComponent";

function AddEmployee() {
  const [userInput, setUserInput] = useState({
    date: "",
  });

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/home`);
  };

  const initialUserInput = {
    userid: "",
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    // date: "",
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const inputValue = value;
  //   setUserInput((prevState) => ({
  //     ...prevState,
  //     [name]: inputValue,
  //   }));
  // };

  const handleFunctionClick = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:3004/employeedetails`,
        userData
      );
      return response;
    } catch (error) {
      console.log("Error sending data: ", error);
    }
  };
  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">
            {" "}
            <span style={{ marginRight: "20px", fontSize: "60px" }}>
              Add Employee
            </span>
          </h2>
          <Button
            variant="contained"
            color="success"
            id="button"
            onClick={handleButtonClick}
            style={{ width: "180px" }}
          >
            Home
          </Button>
          <br />
        </div>

        <div className="mainContainer">
          <div className="inputForm">
            <h3 id="heading2">Enter employee details</h3>
            <FormComponent
              initialUserInput={initialUserInput}
              handleFunctionClick={handleFunctionClick}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);
