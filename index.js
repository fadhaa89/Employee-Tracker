const inquirer = require('inquirer')
require('console.table');
const DB = require('./db/database');
// allows you to use Async await // 
const mysql = require('mysql2');
const { response } = require('express');



//CREATE CONNECTION
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //user name and password //
    user: 'root',
    password: 'root',
    database: 'employees'
})
// main menu function -prompt //
//ARRAY OF QUESTIONS TO ASK ABOUT EACH ROLE//
function mainMenu() {
    inquirer.prompt([{
        name: 'mainMenu',
        type: 'list',
        message: "Please select an option: ",
        choices: ['View departments', 'View roles', 'View employees', 'Add department', 'Add role', 'Add employee', 'Update the employee role', 'Quit']
    }])
        .then(response => {
        
            switch (response.mainMenu) {
                case 'View departments':
                    viewDepartments();
                    break;
                case 'View roles':
                    viewRoles();
                    break;
                case 'View employees':
                    viewEmployees();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'Update the employee role':
                    updateEmployee();
                    break;
                case 'Quit':
                    connection.end();
                    break;
                default:
                    console.log("Error");
                    break;

            }
        })

}
//function to view the departments //
function viewDepartments() {
    console.log("hello");
    connection.query('SELECT * FROM department', (error, result) => {
        if (error) throw error;

        console.log('\nDepartments');
        console.table(result);

        mainMenu();
    })
}
//function to view the rols //
function viewRoles() {
    connection.query('SELECT * FROM role', (error, result) => {
        if (error) throw error;

        console.log('\nRoles');
        console.table(result);

        mainMenu();
    })
}
//function to view employees//
function viewEmployees() {
    connection.query('SELECT * FROM employee', (error, result) => {
        if (error) throw error;

        console.log('\nEmployees');
        console.table(result);

        mainMenu();
    })
}
//function to add a department //
function addDepartment() {
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter the department name: '
    }])
        .then(response => {
            connection.query('INSERT INTO department(name) VALUES (?)', [response.name], (error, result) => {
                if (error) throw error;
            })

            viewDepartments();
        })
}
// role to be added as a function //
 async function addRole() {
     try {
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter the role name: '
    },
    {
        name: 'salary',
        type: 'number',
        message: 'Enter the salary: ',
        validate: salary => {
            if (salary) {
                return true;
            } else {
                console.log('Please enter a number!');
                return false;
            }
        }
    },
    {
        name: 'department',
        type: 'list',
        message: 'Select the department:',
        choices: getDepartments()
    }
    ])
        .then(response => {
            var responseID = 0;

            connection.query('SELECT id FROM department WHERE name = ?', [response.department], (error, result) => {

                if (error) throw error;
                result.forEach(id => {
                    responseID = id.id;
                })

                connection.query('INSERT INTO role SET ?', {
                    title: response.name,
                    salary: response.salary,
                    department_id: responseID
                }, (error, result) => {
                    if (error) throw error;
                })

                viewRoles();
            })
        })
    } catch (err){
        console.log(err);
    }
}
//Employee add //
function addEmployee() {
    inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: 'Enter the employee first name: '
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'Enter the employee last name: '
    },
    {
        name: 'role',
        type: 'list',
        message: 'Select the role:',
        choices: getRoles()
    },
    {
        name: 'manager',
        type: 'list',
        message: 'Select the manager:',
        choices: getEmployees()
    }
    ])
        .then(response => {
            var roleID = 0;
            var managerID = 0;

            connection.query('SELECT id FROM role WHERE title = ?', [response.role], (error, result) => {
                if (error) throw error;

                result.forEach(id => {
                    roleID = id.id;
                })

                var managerFirstName = "";

                for (var i = 0; i < response.manager.length; i++) {
                    if (response.manager.charAt(i) === " ") {
                        break;
                    } else {
                        managerFirstName += response.manager.charAt(i);
                    }
                }

                connection.query('SELECT id FROM employee WHERE first_name = ?', [managerFirstName], (error, nextResult) => {
                    if (error) throw error;

                    nextResult.forEach(id => {
                        managerID = id.id;
                    })

                    connection.query('INSERT INTO employee SET ?', {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: roleID,
                        manager_id: managerID
                    }, (error, result) => {
                        if (error) throw error;
                    })

                    viewEmployees();
                })
            })
        })
}

function updateEmployee() {
    inquirer.prompt([{
        name: 'employee',
        type: 'number',
        message: 'Enter the employee ID of the employee you wish to update:'
    },
    {
        name: 'role',
        type: 'number',
        message: 'Enter the role ID you wish to update the employee to:'
    }
    ])
        .then(response => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ? ', [response.role, response.employee], (error, result) => {
                if (error) throw error;

                viewEmployees();
            })
        })
}

function getDepartments() {
    console.log("hello");
    let departments = [];
    connection.query('SELECT name FROM department', (error, response) => {
        if (error) throw error;

        response.forEach(department => {
            departments.push(department.name);
        })
        console.log(departments);

        return departments;
    })

}

function getRoles() {
    let roles = [];
    connection.query('SELECT title FROM role', (error, response) => {
        if (error) throw error;

        response.forEach(role => {
            roles.push(role.title);
        })
    })

    return roles;
}
// getting the Employee by :First names and last names //
function getEmployees() {
    let firstNames = [];
    let lastNames = [];
    let employees = [];

    connection.query('SELECT first_name FROM employee', (error, response) => {
        if (error) throw error;

        response.forEach(first_name => {
            firstNames.push(first_name.first_name);
        })

        connection.query('SELECT last_name FROM employee', (error, response) => {
            if (error) throw error;

            response.forEach(last_name => {
                lastNames.push(last_name.last_name);
            })

            for (var i = 0; i < firstNames.length; i++) {
                employees[i] = firstNames[i] + " " + lastNames[i];
            }
        })
    })

    return employees;
}

/////----------------------connection-----------------///////
connection.connect(err => {
    if (err) throw err;

    console.log('connected as id ' + connection.threadId + '\n');
    console.log('WELCOME TO EMPLOYEE TRACKER!' + '\n');

    mainMenu();
})