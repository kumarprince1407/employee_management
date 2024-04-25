import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import store from "../redux/store";

import { updateDetails } from "../redux/actions";

function EditEmployeeDetails() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userid: "",
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/employeedetails/${id}`
        );
        const data = response.data;
        console.log("Data", data);
        setUserInput({
          userid: data.userid,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          salary: data.salary,
          date: data.date,
        });
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

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

    // Perform the update logic using the id of the item being edited
    const itemId = location.state?.id; // We may need to pass the id when navigating

    try {
      const response = await axios.patch(
        `http://localhost:3004/employeedetails/${id}`,
        {
          ...userInput, // Spread userInput properties
          id: parseInt(id), //Include the id in the request body
        }
      );
      if (response.status === 200) {
        console.log("Data updated successfully");
        navigate("/home");
      } else {
        console.log("Failed to update data:", response.status);
      }
    } catch (error) {
      console.log("Error updsating data: ", error);
    }
  };

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
            color="success"
            id="button"
            onClick={handleButtonClick}
          >
            Home
          </Button>
        </div>
        <div className="mainContainer">
          <div className="inputForm">
            <h3 id="heading2">Update employee details</h3>
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
                Update & Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(null, { updateDetails })(EditEmployeeDetails);
