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
