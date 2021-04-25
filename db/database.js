class DB {

    // Get Departments
    get showDepartments() {
        return "SELECT department.id, department.name FROM department"
    }

    // Add new Role
    get createRole() {
        return "INSERT INTO role SET ?"
    }

    // Get Roles
    get showRoles() {
        return "SELECT role.id, role.title FROM role"
    }

    // Get Manager
    get showManagers() {
        return "SELECT employee.id, employee.first_name, employee.last_name FROM employee"
    }

    // Add new Employee
    get createEmployee() {
        return "INSERT INTO employee SET ?"
    }

    // Update Role
    get updateRole() {
        // issue with this sql syntax
        return "UPDATE employee SET role_id = ? WHERE id = ?"
      }
}

module.exports = new DB();