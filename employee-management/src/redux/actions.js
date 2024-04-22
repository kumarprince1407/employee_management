import axios from "axios";

export const addEmployee = (employee) => async (dispatch) => {
  try {
    //TODO: Add path to the post request after creating the server
    const response = await axios.post("", employee);
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
    //TODO: Add path to the patch request after creating the server
    const response = await axios.patch(``, updateDetails);
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
    //TODO: Add path to the patch request after creating the server
    await axios.delete(``);
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
    //TODO: Add path to the get request after creating the server
    const response = await axios.get("");
    dispatch({
      type: "FETCH_EMPLOYEE_DETAILS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error fetching details: ", error);
  }
};
