-- SELECT 'Database rebuild started...'
-- DROP DATABASE IF EXISTS department_db;
-- CREATE DATABASE department_db;

-- \c department_db;

-- SELECT pg_terminate_backend(pg_stat_activity.pid)
-- FROM pg_stat_activity
-- WHERE pg_stat_activity.datname = 'department_db'
--   AND pid <> pg_backend_pid():

DROP DATABASE IF EXISTS department_db;

CREATE DATABASE department_db;
\c department_db;

CREATE TABLE department (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL);
    
CREATE TABLE role (
  id   SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL
  REFERENCES role(id),
  manager_id INTEGER,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
    
