# Polytechnic Library API

This is the backend API for the Polytechnic Library system, designed to manage book borrowing and user accounts with secure authentication and role-based authorization.

## Features
- **Authentication**: JWT-based login and Bcryptjs password hashing.
- **Role-based Authorization**: 
  - `member`: Can view books.
  - `librarian`: Can view books AND update book availability.
- **Database**: Microsoft SQL Server.

## Prerequisites
- Node.js installed
- MS SQL Server installed and running with TCP/IP enabled.

## Setup Instructions

1. Clone the repository and navigate to the folder.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file in the root directory and add the following:
   ```text
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_SERVER=localhost
   DB_DATABASE=PolytechnicLibrary
   JWT_SECRET=your_jwt_secret_key
   PORT=3000

## Testing with Postman

To successfully test the protected endpoints, follow this sequence:

1. **Register a User:** Send a `POST` request to `http://localhost:3000/register` with a JSON body containing `username`, `password`, and `role` (either "member" or "librarian").
2. **Login:** Send a `POST` request to `http://localhost:3000/login` with the same credentials. The server will return a JWT token.
3. **Access Protected Routes:** Copy the token. For any `GET` or `PUT` requests, go to the **Authorization** tab in Postman, select **Bearer Token**, and paste your token.
4. **Role Verification:** Note that if a user logs in with the `member` role, the server will intentionally reject requests to the `PUT /books/:bookId/availability` endpoint with a `403 Forbidden` status.