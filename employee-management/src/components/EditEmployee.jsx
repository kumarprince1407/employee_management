//EditEmployee.jsx
import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeDetailsById, updateDetails } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

//change

import FormComponent from "./FormComponent";
import Logout from "./Logout";

import "./style.css";

function EditEmployee() {
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch(); //Redux dispatch

  const useridRef = useRef(null);

  // Fetch employee details by ID from Redux
  useEffect(() => {
    dispatch(fetchEmployeeDetailsById(id));
  }, [id, dispatch]); // Run effect when ID changes

  // Get the specific employee data from Redux
  const employee = useSelector((state) =>
    state.employeeManagementData.find((emp) => emp.id === parseInt(id))
  );
  const initialUserInput = {
    userid: employee?.userid || "", // Providing a default value
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    salary: employee?.salary || "",
  };

  useEffect(() => {
    // If we have the employee data, set focus to the user ID field
    if (employee && useridRef.current) {
      useridRef.current.focus();
    }
  }, [employee]); // Dependency on employee data to ensure we have it before setting focus

  const handleFunctionClick = async (userData) => {
    dispatch(updateDetails(id, userData));
    navigate("/home");
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
            // color="success"
            id="button2"
            onClick={handleButtonClick}
            sx={{ background: "darkblue" }}
          >
            Home
          </Button>
          <Logout />
        </div>

        <div className="mainContainer">
          <div className="inputForm">
            <span id="heading2" style={{ fontSize: "40px" }}>
              Enter updated details
            </span>
            <FormComponent
              initialUserInput={initialUserInput}
              isUpdate={true} //To indicate this is an update
              employeeId={id} //Passing the employee ID for updating
              handleFunctionClick={handleFunctionClick} //Action to be executed on form submission
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditEmployee;
