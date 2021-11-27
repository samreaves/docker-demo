/* Use new database */
USE docker_demo

/* Create users table with ID, name, username, password, and balance */
CREATE TABLE users
(
id INT(45) NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
username VARCHAR(30) NOT NULL,
password VARCHAR(30) NOT NULL,
balance DECIMAL(7,2) NOT NULL
);

/* Seed database */
INSERT INTO users (name, username, password, balance) 
VALUES
("Sam", "sam", "somepassword", 300.00)