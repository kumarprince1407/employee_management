//AddEmployee.jsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { addEmployee } from "../redux/actions";

import FormComponent from "./FormComponent";
import { useDispatch } from "react-redux";

import "./style.css";
import Logout from "./Logout";
//change

function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //Redux dispatch

  const handleButtonClick = () => {
    navigate(`/home`);
  };

  const initialUserInput = {
    userid: "",
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    date: "",
  };

  //Redux change
  const handleFunctionClick = async (userData) => {
    dispatch(addEmployee(userData)); // Dispatch Redux action to add a new task
    navigate(`/home`);
  };

  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">Add Employee </h2>
          <Button
            variant="contained"
            // color="success"
            id="button2"
            onClick={handleButtonClick}
            sx={{ background: "darkblue", marginLeft: "25%" }}
          >
            Home
          </Button>
          <Logout />
        </div>
        <div className="mainContainer">
          <div className="inputForm">
            <span id="heading2" style={{ fontSize: "40px" }}>
              Enter employee details
            </span>
            <FormComponent
              initialUserInput={initialUserInput}
              isUpdate={false}
              handleFunctionClick={handleFunctionClick}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddEmployee;
