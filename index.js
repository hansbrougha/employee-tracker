//DEPENDENCIES
const { prompt } = require("inquirer");
const db = require("./db");
const logo = require("asciiart-logo");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Tracker" }).render();

  console.log(logoText);

  choicePrompts();
}

//MAIN PROMPTS SECTION
async function choicePrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an Action:",
      choices: [
        {
          name: "View Employees",
          value: "GET_EMPLOYEES"
        },
        {
          name: "View Roles",
          value: "GET_ROLES"
        },
        {
          name: "View Departments",
          value: "GET_DEPARTMENTS"
        },
        {
          name: "View Employees By Manager",
          value: "EMPLOYEES_BY_MANAGER"
        },
        {
          name: "View Employees By Department",
          value: "EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Update Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Delete Employee",
          value: "DELETE_EMPLOYEE"
        },

        // {
        //   name: "Update Employee Manager",
        //   value: "UPDATE_MANAGER"
        // },
        {
          name: "Delete Role",
          value: "DELETE_ROLE"
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
      return deleteEmployee();
    case "UPDATE_ROLE":
      return updateRole();
    // case "UPDATE_MANAGER":
    //   return updateManager();
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
  const departmentOptions = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Please specify a department:",
      choices: departmentOptions
    }
  ]);

  const employees = await db.employeesByDepartment(departmentId);
  console.table(employees);
  choicePrompts();
}

//View Employees By Manager
async function employeesByManager() {
  const managers = await db.allEmployees();

  const managerOptions = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Please Choose a Manager:",
      choices: managerOptions
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

//Add New Role
async function addRole() {
  const departments = await db.allDepartments();
  const departmentOptions = await departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "Enter a new role:"
    },
    {
      name: "salary",
      message: "Enter a salary for this role:"
    },
    {
      type: "list",
      name: "department_id",
      message: "Choose a department for this role:",
      choices: departmentOptions
    }
  ]);
  await db.newRole(role);
  console.log("Role added to database.");
  choicePrompts();
}

//View Roles
async function getRoles() {
  const roles = await db.allRoles();
  console.table(roles);
  choicePrompts();
}

//Update Employee Role
async function updateRole() {
  const employees = await db.allEmployees();

  const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Choose an employee to change their role:",
      choices: employeeOptions
    }
  ]);

  const roles = await db.allRoles();

  const roleOptions = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Assign new role:",
      choices: roleOptions
    }
  ]);

  await db.updateRole(employeeId, roleId);

  console.log("Employee role has been updated.");

  choicePrompts();
}

//View Departments
async function getDepartments() {
  const departments = await db.allDepartments();
  console.table(departments);
  choicePrompts();
}

//Add Employees
async function addEmployee() {
  const roles = await db.allRoles();
  const employees = await db.allEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "Enter employee's first name:"
    },
    {
      name: "last_name",
      message: "Enter employee's last name:"
    }
  ]);

  const roleOptions = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "Enter employee role:",
    choices: roleOptions
  });

  employee.role_id = roleId;

  const managerOptions = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerOptions.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Assign employee to manager:",
    choices: managerOptions
  });

  employee.manager_id = managerId;

  await db.newEmployee(employee);

  console.log("Added Employee to Database.");

  choicePrompts();
}

//Add Departments
async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "Enter a department name:"
    }
  ]);
  await db.newDepartment(department);
  console.log("Department added to database.");
  choicePrompts();
}

//TERMINATE EMPLOYEES
async function deleteEmployee() {
  const employees = await db.allEmployees();
  const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Choose an employee to terminate:",
      choices: employeeOptions
    }
  ]);

  await db.deleteEmployee(employeeId);
  console.log("Employee has been terminated.");
  choicePrompts();
}

//DELETE ROLES
async function deleteRole() {
  const roles = await db.allRoles();
  const roleOptions = roles.map(({ id, title }) => ({
    name: title,
    value,
    id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Choose a role to delete:",
      choices: roleOptions
    }
  ]);

  await db.deleteRole(roleId);
  console.log("Role deleted from database.");
  choicePrompts();
}

//DELETE DEPARTMENTS
async function deleteDepartment() {
  const departments = await db.allDepartments();
  const departmentOptions = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message: "Choose a department to delete:",
    choices: departmentOptions
  });
  await db.deleteDepartment(departmentId);
  console.log("Removed department from the database");
  choicePrompts();
}

//Exit Database
function quit() {
  console.log("Exiting database...");
  process.exit();
}
