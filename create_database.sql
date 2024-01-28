-- Create a database if it doesn't exist
CREATE DATABASE IF NOT EXISTS lookatme;

-- Create a user and grant privileges
CREATE USER '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON lookatme.* TO '${MYSQL_USER}'@'localhost';

-- Flush privileges to apply the changes immediately
FLUSH PRIVILEGES;

-- Use the created database
USE lookatme;

-- Create a table
CREATE TABLE IF NOT EXISTS Counter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  looked_overall INT DEFAULT 0,
  tapped_overall INT DEFAULT 0
);

-- Insert data with default values
INSERT INTO Counter (looked_overall, tapped_overall)
VALUES (0, 0);
