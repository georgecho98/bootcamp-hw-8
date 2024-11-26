TRUNCATE TABLE employee, role, department RESTART IDENTITY CASCADE;

INSERT INTO department (name) 
VALUES ('loan'),
       ('service'),
       ('Sales');


INSERT INTO role (title, salary,department_id) 
VALUES ('President' ,100000,3),
       ('staff', 5000,1),
       ('accountant',7000,2);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('jenson','s',1, 1),
       ('Tom','Streety',2,2),
       ('Sam','Ethan',3, 3);

