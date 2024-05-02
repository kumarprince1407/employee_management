//EditEmployee.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateDetails } from "../redux/actions";
import { connect } from "react-redux";

import FormComponent from "./FormComponent";

import "./style.css";

function EditEmployee() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const [userInput, setUserInput] = useState({
    userid: "",
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
  });

  const useridRef = useRef(null);

  const handleFunctionClick = async (userData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3004/employeedetails/${userData.id}`,
        userData
      );
      return response;
    } catch (error) {
      console.log("Error updating data: ", error);
    }
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/employeedetails/${id}` // Fetch employee details
        );
        const data = response.data;
        console.log("Data: ", data);
        setUserInput({
          id, //Include the id in the userInput state
          userid: data.userid,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          salary: data.salary,
        });

        useridRef.current?.focus();
      } catch (error) {
        console.log("Error fetching details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  //   const handleInputChange = (e) => {
  //     const { name, value, type } = e.target;
  //     const inputValue = value;

  //     setUserInput((prevState) => ({
  //       ...prevState,
  //       [name]: inputValue,
  //     }));
  //   };

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">Edit employee details</h2>
          <Button
            variant="contained"
            // color="success"
            id="button2"
            onClick={handleButtonClick}
          >
            Home
          </Button>
        </div>

        <div className="mainContainer">
          <div className="inputForm">
            <h3 id="heading2">Enter updated details</h3>
            <FormComponent
              initialUserInput={userInput}
              handleFunctionClick={handleFunctionClick}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(null, { updateDetails })(EditEmployee);
