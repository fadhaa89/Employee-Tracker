const inquirer = require('inquirer')
const cTable = require('console.table');
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
    database: 'employee-tracker'
})

function mainMenu() {
    inquirer.prompt([{
            name: 'mainMenu',
            type: 'list',
            message: "Please select an option: ",
            choices: ['View  departments', 'View roles', 'View employees', 'Add  department', 'Add  role', 'Add  employee', 'Update the employee role', 'Quit']
        }])
        .then(response => {
            switch (response.mainMenu) {
                case 'View  departments':
                    viewDepartments();
                    break;
                case 'View  roles':
                    viewRoles();
                    break;
                case 'View  employees':
                    viewEmployees();
                    break;
                case 'Add  department':
                    addDepartment();
                    break;
                case 'Add  role':
                    addRole();
                    break;
                case 'Add  employee':
                    addEmployee();
                    break;
                case 'Update the employee role':
                    updateEmployee();
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        })

}

function viewDepartments() {
    connection.query('SELECT * FROM department', (error, result) => {
        if (error) throw error;

        console.log('\nDepartments');
        console.table(result);

        mainMenu();
    })
}

function viewRoles() {
    connection.query('SELECT * FROM role', (error, result) => {
        if (error) throw error;

        console.log('\nRoles');
        console.table(result);

        mainMenu();
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee', (error, result) => {
        if (error) throw error;

        console.log('\nEmployees');
        console.table(result);

        mainMenu();
    })
}

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
