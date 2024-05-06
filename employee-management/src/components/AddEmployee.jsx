//AddEmployee.jsx
import React from "react";
//import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { addEmployee, fetchEmployeeDetails } from "../redux/actions";

import FormComponent from "./FormComponent";
import { useDispatch } from "react-redux";

import "./style.css";
import Logout from "./Logout";
//change

function AddEmployee() {
  // const [date, setDate] = useState({
  //   date: "",
  // });

  const navigate = useNavigate();
  const dispatch = useDispatch(); //Redux dispatch

  //Using 'useSelector' hook to get the redux store - CHECK
  const employeeData = useSelector((state) => state.employeeManagementData);

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
  };

  return (
    <React.Fragment>
      <div className="fragment1">
        {/* start */}
        <div className="headingContainer">
          <h2 id="heading1">Add Employee </h2>
          <Button
            variant="contained"
            // color="success"
            id="button2"
            onClick={handleButtonClick}
            sx={{ background: "darkblue" }}
          >
            Home
          </Button>
          <Logout />
        </div>
        {/* end */}
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
