//actions.js
import axios from "axios";

export const addEmployee = (employee) => async (dispatch) => {
  try {
    //TODO: Add path to the post request after creating the server - DONE
    const response = await axios.post(
      "http://localhost:3004/employeemanagement",
      employee
    );
    console.log("Server response: ", response.data);

    dispatch({
      type: "ADD_EMPLOYEE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error adding employee details: ", error);
  }
};

export const updateDetails = (id, updateDetails) => async (dispatch) => {
  try {
    //TODO: Add path to the patch request after creating the server - DONE
    const response = await axios.patch(
      `http://localhost:3004/employeemanagement/${id}`,
      updateDetails
    );
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { id, updateDetails: response.data },
    });
  } catch (error) {
    console.log("Error updating employee details");
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    //TODO: Add path to the patch request after creating the server - DONE
    await axios.delete(`http://localhost:3004/employeemanagement/${id}`);
    dispatch({
      type: "DELETE_EMPLOYEE",
      payload: id,
    });
  } catch (error) {
    console.log("Error deleting employee details: ", error);
  }
};

export const fetchEmployeeDetails = () => async (dispatch) => {
  try {
    //TODO: Add path to the get request after creating the server - DONE
    const response = await axios.get(
      "http://localhost:3004/employeemanagement"
    );
    dispatch({
      type: "FETCH_EMPLOYEE_DETAILS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error fetching details: ", error);
  }
};
