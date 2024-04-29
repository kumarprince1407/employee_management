//FormComponent.jsx
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { addEmployee } from "../redux/actions";

function FormComponent({ initialUserInput, handleFunctionClick }) {
  //{initialUserInput, handleFunctionClick} is a destructured obj that reprents the props passed to the component

  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({});
  const [formValid, setFormValid] = useState(true);

  //location
  const location = useLocation();
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
        {!formValid && (
          <p style={{ color: "red", marginTop: "5px" }}>
            Please fill in all the details.
          </p>
        )}
        <br />
        {/* change */}
        {page && (
          <>
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
            {!formValid && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Please fill in all the fields.
              </p>
            )}
            <br />
          </>
        )}
        <div className="buttonContainer">
          <Button variant="contained" color="success" type="submit">
            {/* {initialUserInput.id ? "Update & Save" : "Add New Employee"} */}
            {page ? "Add New Employee" : "Update & Save"}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default FormComponent;
