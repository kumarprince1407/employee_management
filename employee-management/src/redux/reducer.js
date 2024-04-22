//reducer.js
const initialState = {
  employeeData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employeeData: [...state.employeeData, action.payload],
      };
    //UPDATE_DETAILS, DELETE_EMPLOYEE
    case "UPDATE_DETAILS":
      const { id, updatedDetails } = action.payload;
      const updatedData = state.employeeData.map((employee) =>
        employee.id === id ? { ...employee, ...updatedDetails } : employee
      );
      return {
        ...state,
        employeeData: updatedData,
      };

    case "DELETE_DETAILS":
      const employeeToDelete = action.payload;
      const filteredData = state.employeeData.filter(
        (employee) => employee.id !== employeeToDelete
      );
      return {
        ...state,
        employeeData: filteredData,
      };

    case "FETCH_EMPLOYEE_DETAILS":
      return {
        ...state,
        employeeData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
