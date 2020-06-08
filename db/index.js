const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  allEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  addEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  // deleteEmployee(employeeId) {
  //   return this.connection.query(employeeId);
  // }

  //Update Roles
  updateEmployeeRole(roleId) {
    return this.connection.query("UPDATE employee SET role_id = WHERE ID = ?", [
      roleId,
      employeeId
    ]);
  }

  // updateEmployeeManager(managerId) {
  //   return this.connection.query(managerId);
  // }

  //View Employees by Manager
  allManagers() {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }
  //View All Roles
  allRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  //Add role
  addRole(role) {
    return this.connection.query("INSERT INTO role SET?", role);
  }

  // deleteRole(roleId) {
  //   return this.connection.query(roleId);
  // }

  //View Employees By Department
  allDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS total_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }

  employeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }

  addDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  // deleteDepartment(departmentId) {
  //   return this.connection.query(departmentId);
  // }

  employeesByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}

module.exports = new DB(connection);
