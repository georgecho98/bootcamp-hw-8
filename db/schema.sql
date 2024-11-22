SELECT 'Database rebuild started...'
DROP DATABASE IF EXISTS temp;
CREATE DATABASE temp;

\c temp;

SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'inventory_db'
  AND pid <> pg_backend_pid():

DROP DATABASE IF EXISTS inventory_db;\

CREATE DATABASE inventory_db;
-- use inventory_db database --


CREATE TABLE department (
  id INTEGER NOT NULL,
  name VARCHAR(30) NOT NULL,
  SERIAL PRIMARY KEY (id)
);
    
CREATE TABLE role (
  id INTEGER NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  SERIAL PRIMARY KEY (id)
);
    

CREATE TABLE employee (
  id INTEGER NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARHCAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER NOT NULL,
  SERIAL PRIMARY KEY (id)
);
    
