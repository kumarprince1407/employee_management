//reducer.js

//It defines the initial state for the redux store. The state has a single property, 'employeeManagementData', initialized to an empty array.
//This property will hold the list of employees in the application.
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
    /*It returns a new object, using the spread poperator(...) to ensure immutability. (Redux reducers must not mutate the state directly).
    This new state contains the previous state(...state) with 'employeeManagementData' updated to include the new employee from 
    'action.payload'. The spread operator ('state.employeeManagementData') ensures eisting employee data is retained, and 'action.payload' is appended.*/

    //UPDATE_DETAILS, DELETE_EMPLOYEE
    case "UPDATE_DETAILS":
      /*It extracts 'id' and 'updatedDetails' from 'action.payload'*/
      const { id, updatedDetails } = action.payload;

      /*Here the 'map' function is used to create a new array by iterating over 'enmployeeManagementData'.
      If 'employee.id' matches the given 'id', the employee object is updated with 'updatedDetails'
      */
      const updatedData = state.employeeManagementData.map((employee) =>
        employee.id === id ? { ...employee, ...updatedDetails } : employee
      );
      //This returns a new state object with employeeManagementData updated to reflect the changes from updatedData.
      return {
        ...state,
        employeeManagementData: updatedData,
      };

    case "DELETE_DETAILS":
      /*It extracts employeeToDelete from action.payload and creates 'filteredData', a new array with all employees except the one with the given employeeToDelete.*/
      const employeeToDelete = action.payload;
      const filteredData = state.employeeManagementData.filter(
        (employee) => employee.id !== employeeToDelete
      );
      //This returns a new state with employeeManagementData updated to filteredData, effectively removing the deleted employee.
      return {
        ...state,
        employeeManagementData: filteredData,
      };

    case "FETCH_EMPLOYEE_DETAILS":
      //It updates the state with a new list of employees fetched from the server.
      return {
        ...state,
        employeeManagementData: action.payload,
      };

    //change
    case "FETCH_EMPLOYEE_DETAILS_BY_ID":
      /*It creates a new array with 'updatedEmployeeData' by spreading the existing 'employeeManagementData'.
      Then it finds the index of the employee whose ID matches action.payload.id*/
      const updatedEmployeeData = [...state.employeeManagementData];
      const employeeIndex = updatedEmployeeData.findIndex(
        (emp) => emp.id === action.payload.id
      );

      /*If the employeeIndex is -1, it means the employee is not in the current list, so it adds them. Otherwise,
      it updates the existing employee at that index with action.payload.*/
      if (employeeIndex === -1) {
        updatedEmployeeData.push(action.payload);
      } else {
        updatedEmployeeData[employeeIndex] = action.payload;
      }
      //It returns a new state with 'employeeManagementData' updated to reflect the changes from 'updatedEmployeeData'
      return {
        ...state,

        employeeManagementData: updatedEmployeeData,
      };
    default:
      return state;
  }
};

export default reducer;
