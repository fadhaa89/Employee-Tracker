DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;




CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) UNIQUE NOT NULL,
   salary VARCHAR(7) NOT NULL,
   department_id INT UNSIGNED,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
   id INT UNSIGNED AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT UNSIGNED NOT NULL,
   manager_id INT UNSIGNED,
   PRIMARY KEY (id),
   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
   CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL

);