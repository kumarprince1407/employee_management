//reducer.js

//It defines the initial state for the redux store. The state has a single property, 'employeeManagementData', initialized to an empty array.
//This property will hold the list of employees in the application.
const initialState = {
  employeeManagementData: [],
};

const reducer = (state = initialState, action) => {
  //The state(with a default value of 'initialState') represents the current Redux state, while the 'action' represents the dispatched action
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state, //We are creating a shallow copy of the entire object

        //In this part, employeeManagementData property of the state is updated. It's replaced with a new array that includes all the existing
        //employee data (...state.employeeManagementData) and a new employee data provided in the 'action.payload'
        employeeManagementData: [
          ...state.employeeManagementData,
          action.payload,
        ], //push operation
      };

    //UPDATE_DETAILS, DELETE_EMPLOYEE
    case "UPDATE_DETAILS":
      /*It extracts 'id' and 'updatedDetails' from 'action.payload'(by destructuring it) which refers to the payload carried by the action dispatched to the Redux store*/
      const { id, updatedDetails } = action.payload;

      /*Here the 'map' function is used to create a new array by iterating over 'enmployeeManagementData'.
      If 'employee.id' matches the given 'id', the employee object is updated with 'updatedDetails'
      */
      const updatedData = state.employeeManagementData.map(
        (employee) =>
          //'employee' here represents each individual employee object in the 'state.employeeManagementData' array as the 'map' func. iterates over them
          employee.id === id ? { ...employee, ...updatedDetails } : employee
        /*If there's a match ('employee.id === id), it creates a new object using the spread operator('...employee') to copy all the properties of the
        current employee object, and then spreads 'updatedDetails' to apply the changes
        */
      );
      //This returns a new state object with employeeManagementData updated to reflect the changes from updatedData.
      return {
        ...state,
        employeeManagementData: updatedData, //Updating the 'employeeManagementData' property of the state with the updatedData array created above
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
