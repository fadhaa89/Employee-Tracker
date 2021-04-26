USE employees;

INSERT INTO department (name)
VALUES
 ('Sales'), -- 1
 ('Human Resources'), -- 2
 ('Marketing'), -- 3
 ('IT'), -- 4
 ('Accounting') -- 5
 ;

INSERT INTO role (title, salary, department_id)
VALUES
 ('Sales Manager', 50000, 1), -- 1
 ('Sales Rep', 30000, 1), -- 2
 ('Developer Manager', 15000, 2), -- 3
 ('HR Admin', 50000, 2), -- 4
 ('Marketing Director', 140000, 3), -- 5
 ('Marketing Admin', 65000, 3), -- 6
 ('HR Director', 195000, 4), -- 7
 ('Costomer Center Support', 60000, 4), -- 8
 ('Accounting Manager', 110000, 5), -- 9
 ('Accountant', 80000, 5) -- 10
 ;


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7)
 ;