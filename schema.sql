DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (department_id)
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) UNIQUE NOT NULL,
   salary VARCHAR(7) NOT NULL,
   department_id INT NULL,
   FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (role_id) REFERENCES role(id),
   FOREIGN KEY (manager_id) REFERENCES employee(id)

);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;
© 2021 GitHub, Inc.
