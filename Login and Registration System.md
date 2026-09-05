# Full-Stack Auth System

A lightweight login and registration system built with React, Flask, and MySQL. 

## Tech Stack
- **Frontend**: React.js 
- **Backend**: Python Flask
- **Database**: MySQL (PyMySQL)
- **Security**: Werkzeug password hashing

## 1. Database Setup
Before starting the backend, initialize the MySQL database.
Open your MySQL terminal and execute:

```sql
CREATE DATABASE IF NOT EXISTS auth_system DEFAULT CHARSET utf8mb4;
USE auth_system;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);