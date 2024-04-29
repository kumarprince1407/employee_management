//server.js
const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors"); //Add CORS middleware

const app = express();

const port = 3004;

//Middleware setup
app.use(bodyParser.json());
app.use(cors()); //Enable CORS

//TODO: Chenge it to Employee database
let employeeManagementData = [
  {
    id: 101,
    userid: "harryPotter",
    firstName: "Harry",
    lastName: "Potter",
    email: "potter@gryffindor.com",
    salary: 80000,
    date: "2011-04-17",
  },
  {
    id: 102,
    userid: "sheldonCooper",
    firstName: "Sheldon",
    lastName: "Cooper",
    email: "cooper@stanford.com",
    salary: 90000,
    date: "2007-06-21",
  },

  {
    id: 103,
    userid: "jakSparrow",
    firstName: "Jack",
    lastName: "Sparrow",
    email: "sparrow@blackpearl.com",
    salary: 60000,
    date: "2012-08-08",
  },
];

//Function to generate a unique random 3-digit number to be used as ID
const generateRandom = () => {
  let newId;
  do {
    newId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  } while (employeeManagementData.some((item) => item.id === newId));
  return newId;
};

//GET endpoint for getting all employee details
app.get("/employeedetails/", (req, res) => {
  res.json(employeeManagementData);
});

// GET endpoint for specific employee by ID
app.get("/employeedetails/:id", (req, res) => {
  const idToFetch = parseInt(req.params.id);
  console.log("ID to fetch: ", idToFetch);
  const itemToFetch = employeeManagementData.find(
    (item) => item.id === idToFetch
  );

  if (itemToFetch) {
    res.json(itemToFetch); // Return the specific employee details
  } else {
    res.status(404).json({ message: "Employee not found" }); // Better error message
  }
  console.log("Item to fetch:", itemToFetch);
});
//POST
app.post("/employeedetails", (req, res) => {
  const receivedData = req.body;
  console.log("Received data:", receivedData);

  const newItem = {
    id: generateRandom(),
    userid: receivedData.userid,
    firstName: receivedData.firstName,
    lastName: receivedData.lastName,
    email: receivedData.email,
    salary: receivedData.salary,
    date: receivedData.date,
  };

  //Process the data or save it to a database
  employeeManagementData.push(newItem);

  res.status(200).send("Data received successfully");
});

//PATCH
app.patch("/employeedetails/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  // const { completed } = req.body;

  const itemToUpdate = employeeManagementData.find(
    (item) => item.id === idToUpdate
  );

  if (itemToUpdate) {
    //If the item is found, update its completed status
    // const { userid, firstName, lastName, email, salary, date } = req.body;
    const { userid, firstName, lastName, email, salary } = req.body;
    itemToUpdate.userid = userid;
    itemToUpdate.firstName = firstName;
    itemToUpdate.lastName = lastName;
    itemToUpdate.email = email;
    itemToUpdate.salary = salary;
    // itemToUpdate.date = date;
    console.log("Item to update: ", itemToUpdate);
    res.status(200).send(itemToUpdate);
  } else {
    //If the item is not found, send a 404 response
    res.status(404).send("Item not found");
  }
});

//Delete endpoint to remove an item with a specific ID
app.delete("/employeedetails/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);

  //Find the inddex of the item with the secified ID
  const indexToDelete = employeeManagementData.findIndex(
    (item) => item.id === idToDelete
  );

  if (indexToDelete !== -1) {
    // If the item is found, remove it from the array
    employeeManagementData.splice(indexToDelete, 1);
    res.status(200).send("Data deleted successfully");
  } else {
    //If the item is not found ,send a 404 response
    res.status(404).send("Item not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
