import express from 'express';
// import { QueryResult } from 'pg';
import { pool, connectToDb } from './src/connection.js';
import inquirer from "inquirer";
import fs, { readFile } from 'fs';
import pg from 'pg';

import dotenv from 'dotenv';
dotenv.config();
await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const deletedRow = 2;

class init {
        
   
      ViewAllDepartment() {
      pool.query('SELECT * FROM department', (err, result) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
          this.start();
        });
  }
  ViewAllRole() {
      pool.query('SELECT * FROM role', (err, result) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
          this.start();
        });
  }
  ViewAllEmployee() {
      pool.query('SELECT * FROM employee', (err, result) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
          this.start();
        });
  }
  addDepart() {
      inquirer
          .prompt([
          {
                  type:"input",
                  name: "Departmentname",
                  message: "What is the name of the department"
          }
              ])
          .then((answers) => {
            const query = `INSERT INTO department (name) VALUES ($1)`;
            const values = [answers.Departmentname];

            pool.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Department added successfully!');
                    return;
              }})
              this.start();
            })
  };
  addRole() {
      inquirer
          .prompt([
              {   type:"input",
                  name: "Role",
                  message: "What is the name of the role",
              },
              {   type:"input",
                  name: "salary",
                  message: "What is the salary of the role",
              },
              {   type:"input",
                  name: "departmentId",
                  message: "Which department id does the role belong to",
              }])
          .then((answers) => {

            const query = `INSERT INTO role (title, salary,department_id) VALUES ($1, $2, $3)`;
            const values = [answers.Role, answers.salary, answers.departmentId];

            pool.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Role added successfully!');
                    return;}
                    pool.end;
                });
              this.start();
                           
  })};

  
  addcustserve() {
      inquirer
          .prompt([{   
              type:"input",
              name: "firstName",
              message: "What is the employee's firstname?",
          },
          {   type:"input",
              name: "lastName",
              message: "What is the employee's last name?",
          },
      
          {   type:"input",
              name: "role",
              message: "What is the employee's role?",
          },
      
          {   type:"input",
              name: "manager",
              message: "Who is the employee's manager?"
          }
      ])
          .then((answers) => {
            const query = `INSERT INTO employee (name) VALUES ($1 $2 $3 $4)`;
            const values = [answers.firstName, answers.lastName,answers.role,answers.manager];

            pool.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Employee added successfully!');
                    return;
              }})
              this.start();
            }
            
          )
  };
  UpdateRole() {
    const test = `SELECT first_name,last_name FROM employee`;
    pool.query(test, values, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Role added successfully!');
                    return;}
                    pool.end;
                });
    inquirer
        .prompt([
            {   type:"list",
                name: "RoleName",
                message: "What is the name of the role",
                choices: result.rows.map(row => row.first_name + ' ' + row.last_name)
            },
            {   type:"input",
                name: "salary",
                message: "What is the salary of the role"
            },
            {   type:"input",
                name: "departmentId",
                message: "Which department id does the role belong to"
            }])
        .then((answers) => {

          const query = `INSERT INTO role (title, salary,department_id) VALUES ($1, $2, $3)`;
          const values = [answers.RoleName, answers.salary, answers.departmentId];

          pool.query(query, values, (err, result) => {
              if (err) {
                  console.log(err);
              } else {
                  console.log('Role added successfully!');
                  return;}
                  pool.end;
                  this.start();
              });
                         
    })};


  start() {
      inquirer
        .prompt({   type:'list',
          name: "action",
          message: "What would you like to do?",
          choices: ['View all Departments',
              'View all roles',
              'View all employee',
              'Add Department', 
              'Add ROle', 
              'Add Employee',
              'Update Employee Role',
              'exit' ]
          })

        .then((answers) => {
          if (answers.action === 'View all Departments') {
            this.ViewAllDepartment();
            
          } else if (answers.action === 'View all roles') {
            this.ViewAllRole();
          } else if (answers.action === 'View all employee') {
              this.ViewAllEmployee();
          } else if (answers.action === 'Add Department') {
              this.addDepart();
          } else if (answers.action === 'Add Role') {
              this.addRole();
          } else if (answers.action === 'Add Employee') {
              this.addcustserve();
          } else if (answers.action === 'Update Employee Role') {
              this.UpdateRole();
          } else if (answers.action !=='exit'){this.start()}
        });
    }}



function viewall (){
  const query = `
  SELECT employee.first_name, employee.last_name, role.title, role.salary 
  FROM employee 
  JOIN role ON employee.role_id = role.id
`;

pool.query(query, (err, result) => {
  if (err) {
  console.log(err);
  } else if (result) {
  console.log(result.rows);
  }});
};
const myinit = new init();

viewall();


myinit.start();


// pool.query('SELECT * FROM Department', (err: Error, result: QueryResult) => {
//   if (err) {
//     console.log(err);
//   } else if (result) {
//     console.log(result.rows);
//   }
// });

app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


