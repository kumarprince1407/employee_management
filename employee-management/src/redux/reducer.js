//reducer.js
const initialState = {
  employeeManagementData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employeeManagementData: [
          ...state.employeeManagementData,
          action.payload,
        ],
      };
    //UPDATE_DETAILS, DELETE_EMPLOYEE
    case "UPDATE_DETAILS":
      const { id, updatedDetails } = action.payload;
      const updatedData = state.employeeManagementData.map((employee) =>
        employee.id === id ? { ...employee, ...updatedDetails } : employee
      );
      return {
        ...state,
        employeeManagementData: updatedData,
      };

    case "DELETE_DETAILS":
      const employeeToDelete = action.payload;
      const filteredData = state.employeeManagementData.filter(
        (employee) => employee.id !== employeeToDelete
      );
      return {
        ...state,
        employeeManagementData: filteredData,
      };

    case "FETCH_EMPLOYEE_DETAILS":
      return {
        ...state,
        employeeManagementData: action.payload,
      };

    //change
    case "FETCH_EMPLOYEE_DETAILS_BY_ID":
      return {
        ...state,
        employeeManagementData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
