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
    return this.connection.query(
      console.log(employee);
    );
  }

  deleteEmployee(employeeId) {
    return this.connection.query(employeeId);
  }

  updateEmployeeRole(roleId) {
    return this.connection.query(roleId);
  }

  updateEmployeeManager(managerId){
    return this.connection.query(managerId);
  }

  allManagers() {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  allRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  addRole(role){
    return this.connection.query(role);
  }

  deleteRole(roleId){
    return this.connection.query(roleId);
  }

  allDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS total_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }

  employeesByDepartment(departmentId) {
    return this.connection.query(departmentId);
  }

  addDepartment(department){
    return this.connection.query(department);
  }

  deleteDepartment(departmentId){
    return this.connection.query(departmentId);
  }
}

module.exports = new DB(connection);
