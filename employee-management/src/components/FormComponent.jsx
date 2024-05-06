//FormComponent.jsx
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { addEmployee, updateDetails } from "../redux/actions";
import { useDispatch } from "react-redux";

//change

import "./style.css";

//date
import Date from "./Date";
import dayjs from "dayjs";

function FormComponent({ initialUserInput, isUpdate, employeeId }) {
  //{initialUserInput, handleFunctionClick} is a destructured obj that reprents the props passed to the component

  const navigate = useNavigate(); //Hook to navigate to differnt routes
  const dispatch = useDispatch(); //Redux hook to dispatch actions

  const [userInput, setUserInput] = useState(initialUserInput); //State for form inputs
  const [formValid, setFormValid] = useState(true);

  const location = useLocation();
  //TODO: name the variable correctly - DONE
  const onPageAddEmployee = location.pathname === "/" ? true : false;

  //making use of useEffect hook to handle updates to the initialUserInput prop
  useEffect(() => {
    setUserInput(initialUserInput); //Update the form state when the initial userInput changes
  }, [initialUserInput]); //Dependency on props

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input field

    setUserInput((prevState) => ({
      ...prevState,
      [name]: value, //Update the state based on input field changes
    }));
  };

  const handleDateChange = (newValue) => {
    setUserInput((prevState) => ({
      ...prevState,
      date: newValue ? dayjs(newValue).format("YYYY-MM-DD") : "",
    }));
  };

  /*({...prevState, [name]: inputValue}): this syntax is used to create a new object
  by spreading the properties of the previous state(prevState) and addind/modifying the property
  specified by '[name]' with the value of 'inputValue'*/

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      userInput.userid.trim() === "" ||
      userInput.firstName.trim() === "" ||
      userInput.lastName.trim() === "" ||
      userInput.email.trim() === "" ||
      userInput.salary.trim() === ""
      //userInput.date.trim() === ""
    ) {
      setFormValid(false); // set form validation to false if any of the above condition is satisfied
      return;
    }

    setFormValid(true); //otherwise set form validation to true

    if (isUpdate) {
      dispatch(updateDetails(employeeId, userInput)); //Dispatch update action with employee ID
      navigate("/home"); //navigate after updating
    } else {
      dispatch(addEmployee(userInput)); //Dispatching add action for new employee
      navigate("/home"); //Navigate after adding
    }
  };

  return (
    <React.Fragment>
      <div className="formElement">
        <div className="inputValues">
          <form onSubmit={handleFormSubmit}>
            <div className="formSection">
              <br />
              <label htmlFor="textarea1">
                <div className="inputLabel">
                  <h3>Username:</h3>

                  <TextField
                    // label="User ID"
                    name="userid"
                    value={userInput.userid}
                    onChange={handleInputChange}
                    sx={{ width: "60%" }}
                  />
                </div>
              </label>
              {/* <span className="formText">First Name:</span> */}
              <label htmlFor="textarea2">
                <br />
                <div className="inputLabel">
                  <h3>First name:</h3>

                  <TextField
                    // label="First name"
                    className="inputfield"
                    type="text"
                    name="firstName"
                    value={userInput.firstName}
                    onChange={handleInputChange}
                    sx={{ width: "60%" }}
                  />
                </div>
              </label>

              {/* <span className="formText">Last Name:</span> */}
              <label htmlFor="textarea3">
                <br />
                <div className="inputLabel">
                  <h3>Last name:</h3>

                  <TextField
                    // label="Last name"
                    className="inputfield"
                    type="text"
                    name="lastName"
                    value={userInput.lastName}
                    onChange={handleInputChange}
                    sx={{ width: "60%" }}
                  />
                </div>
              </label>

              {/* <span className="formText">Email:</span> */}
              <label htmlFor="textarea4">
                <br />
                <div className="inputLabel">
                  <h3>Email:</h3>

                  <TextField
                    // label="Email"
                    className="inputfield"
                    type="text"
                    name="email"
                    value={userInput.email}
                    onChange={handleInputChange}
                    sx={{ width: "60%" }}
                  />
                </div>
              </label>

              {/* <span className="formText">Salary:</span> */}
              <label htmlFor="textarea5">
                <div className="inputLabel">
                  <h3>Salary:</h3>

                  <TextField
                    // label="Salary"
                    className="inputfield"
                    type="number"
                    name="salary"
                    value={userInput.salary}
                    onChange={handleInputChange}
                    sx={{ width: "60%" }}
                  />
                </div>
              </label>
              <br />
              {onPageAddEmployee && (
                <div className="inputLabel">
                  <h3>Date of Joining:</h3>
                  <Date />
                </div>
              )}

              {!formValid && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Please fill in all the details.
                </p>
              )}
              {/* change */}

              <br />
            </div>
            <div className="inputLabel">
              <Button
                variant="contained"
                // color="success"
                type="submit"
              >
                {/* {initialUserInput.id ? "Update & Save" : "Add New Employee"} */}
                {onPageAddEmployee ? "Add New Employee" : "Update & Save"}
              </Button>
            </div>
            <br />
            <br />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FormComponent;
