/* 
- \? list all the commands
- \l list databases
- \conninfo display information about current connection
- \c [DBNAME] connect to new database, e.g., \c template1
- \dt list tables of the public schema
- \dt <schema-name>.* list tables of certain schema, e.g., \dt public.*
- \dt *.* list tables of all schemas
- Then you can run SQL statements, e.g., SELECT * FROM my_table;(Note: a statement must be terminated with semicolon ;)
- \q quit psql 
- \d table name 
- \d public.table_name show data types

*/

CREATE TABLE users (
    user_id serial PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL
);

INSERT INTO users(name, email, password) 
  values('erion','erion1@gmail.com', 12345);


ALTER TABLE users 
ALTER COLUMN email TYPE VARCHAR(50);

CREATE TABLE posts (
  post_id serial PRIMARY KEY NOT NULL,
  user_id smallint NOT NULL,
  content TEXT NOT NULL,
  replies TEXT [],
  isOpen boolean NOT NULL
);

INSERT INTO posts (user_id, post_id, content)
values()