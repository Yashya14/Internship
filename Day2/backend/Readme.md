# Employee Management System

This project is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/project-crud.git
   cd project-crud/backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the [backend] directory and add your MongoDB connection string:

   ```env
   PORT=8001
   MONGODB_URL=your_mongodb_connection_string
   ```

4. Start the server:
   ```sh
   npm run server
   ```

## Usage

Once the server is running, you can access the API at `http://localhost:8001/api/`.

## API Endpoints

- **GET /api/users**: Get all users
- **POST /api/users**: Create a new user
- **GET /api/users/:id**: Get a single user by ID
- **PUT /api/users/:id**: Update a user by ID
- **DELETE /api/users/:id**: Delete a user by ID

## Project Structure

```plaintext
backend
├── controllers
│   └── users.controllers.js
├── models
│   └── Users.js
├── routes
│   └── users.routes.js
├── index.js
├── package.json
├── .env
└── README.md
```
