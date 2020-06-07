const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

async function choicePrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Which table would you like to view?",
      choices: [
        {
          name: "Get Employees",
          value: "GET_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View Employees By Manager",
          value: "EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Delete Employee",
          value: "DELETE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_MANAGER"
        },
        {
          name: "Get Roles",
          value: "GET_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Delete Role",
          value: "DELETE_ROLE"
        },
        {
          name: "Get Departments",
          value: "GET_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Delete Department",
          value: "DELETE_DEPARTMENT"
        },
        {
          name: "Exit Database.",
          value: "QUIT"
        }
      ]
    }
  ]);

  //SWITCH CASE FOR USER PROMPTS
  switch (choice) {
    case "GET_EMPLOYEES":
      return getEmployees();
    case "GET_ROLES":
      return getRoles();
    case "GET_DEPARTMENTS":
      return getDepartments();
    default:
      return quit();
  }
}
//View Employees
async function getEmployees() {
  const employees = await db.allEmployees();
  console.table(employees);
  choicePrompts();
}

//View Roles
async function getRoles() {
  const roles = await db.allRoles();
  console.table(roles);
  choicePrompts();
}

//View Departments
async function getDepartments() {
  const departments = await db.allDepartments();
  console.table(departments);
  choicePrompts();
}
//Quit program
function quit() {
  console.log("Exiting database...");
  process.exit();
}
