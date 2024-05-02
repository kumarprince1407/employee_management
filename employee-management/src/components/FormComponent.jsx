//FormComponent.jsx
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { addEmployee } from "../redux/actions";

//change
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//
import "./style.css";

function FormComponent({ initialUserInput, handleFunctionClick }) {
  //{initialUserInput, handleFunctionClick} is a destructured obj that reprents the props passed to the component

  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({});
  const [formValid, setFormValid] = useState(true);

  //location
  const location = useLocation();
  //TODO: name the variable correctly
  const page = location.pathname === "/" ? true : false;

  //making use of useEffect hook to handle updates to the initialUserInput prop
  useEffect(() => {
    setUserInput(initialUserInput);
  }, [initialUserInput]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setUserInput((prevState) => ({
      ...prevState,
      date: date ? date.format("MM/DD/YYYY") : "",
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
    ) {
      setFormValid(false);
      return;
    }

    const response = await handleFunctionClick(userInput);
    console.log("Response logged via Form component", response);

    if (response.status === 200) {
      console.log("Data sent successfully");
      navigate(`/home`);
    } else {
      console.log("Failed to send data:", response.status);
    }
  };

  return (
    <React.Fragment>
      <div className="formElement">
        <div className="inputValues">
          <form onSubmit={handleFormSubmit}>
            <div className="formSection">
              <br />

              <div className="inputLabel">
                <h3>Username:</h3>
              </div>
              <TextField
                // label="User ID"

                name="userid"
                value={userInput.userid}
                onChange={handleInputChange}
                sx={{ width: "60%" }}
              />

              {/* <span className="formText">First Name:</span> */}
              <label htmlFor="textarea2">
                <br />
                <div className="inputLabel">
                  <h3>First name:</h3>
                </div>
                <TextField
                  // label="First name"
                  className="inputfield"
                  type="text"
                  name="firstName"
                  value={userInput.firstName}
                  onChange={handleInputChange}
                  sx={{ width: "60%" }}
                />
              </label>

              {/* <span className="formText">Last Name:</span> */}
              <label htmlFor="textarea3">
                <br />
                <div className="inputLabel">
                  <h3>Last name:</h3>
                </div>
                <TextField
                  // label="Last name"
                  className="inputfield"
                  type="text"
                  name="lastName"
                  value={userInput.lastName}
                  onChange={handleInputChange}
                  sx={{ width: "60%" }}
                />
              </label>

              {/* <span className="formText">Email:</span> */}
              <label htmlFor="textarea4">
                <br />
                <div className="inputLabel">
                  <h3>Email:</h3>
                </div>
                <TextField
                  // label="Email"
                  className="inputfield"
                  type="text"
                  name="email"
                  value={userInput.email}
                  onChange={handleInputChange}
                  sx={{ width: "60%" }}
                />
              </label>

              {/* <span className="formText">Salary:</span> */}
              <label htmlFor="textarea5">
                <div className="inputLabel">
                  <h3>Salary:</h3>
                </div>
                <TextField
                  // label="Salary"
                  className="inputfield"
                  type="number"
                  name="salary"
                  value={userInput.salary}
                  onChange={handleInputChange}
                  sx={{ width: "60%" }}
                />
              </label>

              {!formValid && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Please fill in all the details.
                </p>
              )}
              <br />
              {/* change */}
              {page && (
                <>
                  <div className="inputLabel">
                    <h3>Date of Joining:</h3>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={userInput.date}
                        onChange={handleDateChange}
                        sx={{ width: "60%", marginLeft: "20vw" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <br />
                  {!formValid && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      Please fill in all the fields.
                    </p>
                  )}
                  <br />
                </>
              )}

              <br />
            </div>
            <Button
              variant="contained"
              // color="success"
              type="submit"
            >
              {/* {initialUserInput.id ? "Update & Save" : "Add New Employee"} */}
              {page ? "Add New Employee" : "Update & Save"}
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FormComponent;
