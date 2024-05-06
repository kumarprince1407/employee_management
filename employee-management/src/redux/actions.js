//actions.js
import axios from "axios";

//Action creators

/*
 This function accepts employee data and returns an asynchronous function that performs an 
 HTTP POST request using axios to send the employee data to the server. Upon a successful response, 
 the function dispatches an action of type ADD_EMPLOYEE with the returned employee data as the payload.
*/
export const addEmployee = (employee) => async (dispatch) => {
  //This function receives dispatch as an argument, allowing it to send actions to the redux store
  //The 'employee' parameter represents the data for the new employee that we want to add.
  try {
    //TODO: Add path to the post request after creating the server - DONE
    const response = await axios.post(
      `http://localhost:3004/employeedetails`,
      employee
    );
    console.log("Server response: ", response.data);

    //If the post request is successfull of, it dispatches an action to the Redux store
    //The action has a type of 'ADD_EMPLOYEE' and a 'payload' containing the server's response data
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error adding employee details: ", error);
  }
};

export const updateDetails = (id, updateDetails) => async (dispatch) => {
  //id: The ID of the employee
  //updateDetails: the new information to update the employee with.
  try {
    //TODO: Add path to the patch request after creating the server - DONE
    const response = await axios.patch(
      `http://localhost:3004/employeedetails/${id}`,
      updateDetails
    );

    //If the PATCH request is successful, it dispatches an action with type "UPDATE_DETAILS"
    //and a payload containing the id and the server's updated data.
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { id, updateDetails: response.data },
    });
  } catch (error) {
    console.log("Error updating employee details");
    throw error;
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    //TODO: Add path to the patch request after creating the server - DONE
    await axios.delete(`http://localhost:3004/employeedetails/${id}`);
    dispatch({
      type: "DELETE_DETAILS",
      payload: id,
    });
  } catch (error) {
    console.log("Error deleting employee details: ", error);
  }
};

export const fetchEmployeeDetails = () => async (dispatch) => {
  try {
    //TODO: Add path to the get request after creating the server - DONE
    const response = await axios.get("http://localhost:3004/employeedetails");

    //After a successful GET request, it dispatches an action with type "FETCH_EMPLOYEE_DETAILS" and a payload containing the fetched employee data.
    dispatch({
      type: "FETCH_EMPLOYEE_DETAILS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error fetching details: ", error);
  }
};

//If successful, it dispatches an action with type "FETCH_EMPLOYEE_DETAILS_BY_ID" and a payload containing the specific employee's data
export const fetchEmployeeDetailsById = (id) => async (dispatch) => {
  try {
    //TODO: Add path to the get request after creating the server - DONE
    const response = await axios.get(
      `http://localhost:3004/employeedetails/${id}`
    );
    dispatch({
      type: "FETCH_EMPLOYEE_DETAILS_BY_ID",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error fetching details: ", error);
  }
};
