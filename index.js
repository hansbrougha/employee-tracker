//DEPENDENCIES
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

//MAIN PROMPTS SECTION
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
    case "EMPLOYEES_BY_DEPARTMENT":
      return employeesByDepartment();
    case "EMPLOYEES_BY_MANAGER":
      return employeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "DELETE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_ROLE":
      return updateRole();
    case "UPDATE_MANAGER":
      return updateManager();
    case "GET_DEPARTMENTS":
      return getDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "DELETE_DEPARTMENT":
      return deleteDepartment();
    case "GET_ROLES":
      return getRoles();
    case "ADD_ROLE":
      return addRole();
    case "DELETE_ROLE":
      return deleteRole();
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
//View Employees By Department
async function employeesByDepartment() {
  const departments = await db.allDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Please specify a department:"
      choices: departmentChoices
    }
  ]);

  const employees = await db.employeesByDepartment(departmentId);
  console.table(employees);
  choicePrompts();
}

async function employeesByManager() {
  const managers = await db.AllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Please Choose a Manager:",
      choices: managerChoices
    }
  ]);

  const employees = await db.employeesByManager(managerId);

  if (employees.length === 0) {
    console.log("This employee has no direct reports.");
  } else {
    console.table(employees);
  }

  choicePrompts();
}

async function addRole() {
  const departments = await db.allDepartments();
  const departmentChoices = await departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt({
    {
      name: "title", 
      message: "Please add a new role:"
    },
    {
      name: "salary",
      message: "Enter a salary for this role:"
    },
    {
      type: "list",
      name: "department_id",
      message: "Choose a department for this role:",
      choices: departmentChoices
    }
  });
  await db.addRole(role);
  console.log("Role added to database.");
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

//Add Departments
async function addDepartment(){
  const department = await prompt([
    {
      name: "name",
      message: "Enter a department name:"
    }
  ]);
  await db.addDepartment(department);
  console.log("Department added to database.");
  choicePrompts();
}

//Quit program
function quit() {
  console.log("Exiting database...");
  process.exit();
}
