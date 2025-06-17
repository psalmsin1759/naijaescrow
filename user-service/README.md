## User Service – Naija Escrow

This is the User Service for the Naija Escrow platform. It manages registration, authentication, and user profile operations.

### Tech Stack

  -  Node.js / Express.js

  -  TypeScript

  -  MongoDB with Mongoose

  -  JWT for authentication

  -  Joi for validation

  -  Docker 

   - RabbitMQ for messaging 

   -  Swagger for API documentation

## Project Structure
   src/
├── controllers/        # Handles HTTP requests
├── services/           # Business logic
├── models/             # Mongoose schemas
├── routes/             # Express route handlers
├── validators/         # Joi schema validation
├── middlewares/        # Custom middleware functions
├── repositories/       # DB interaction abstraction
├── utils/              # Helpers (e.g. email templates)
├── events/             # Email dispatch, event emitters
└── index.ts            # Entry point

## Features

 -   User registration

 -   User login with JWT

  -  Profile update and deletion

 -   Forgot and reset password via email

 -   Admin login and management (if included)

  -  Swagger-powered API docs


## Prerequisites

  -  Node.js v18+

  -  MongoDB (Atlas)

   - RabbitMQ 

  -  .env file


  ## Environment Variables

Create a .env file in the root:

```bash
PORT=3001
MONGODB_URI=mongodb://localhost:27017/naijaescrow-users
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://yourfrontend.com

```

## Installation
```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build && npm start

```

## API Endpoints

Base URL: http://localhost:3001/api/users

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/register`        | Register a new user      |
| POST   | `/login`           | Login a user             |
| POST   | `/forgot-password` | Send password reset link |
| POST   | `/reset-password`  | Reset password           |
| GET    | `/`                | Get all users            |
| GET    | `/:id`             | Get a user by ID         |
| PUT    | `/:id`             | Update user info         |
| DELETE | `/:id`             | Delete user              |

## Running Tests 

```bash
npm run test
```
## API Documentation

Swagger UI is available at:
```bash
http://localhost:3001/api-docs
```
![System Design](/docs/screenshots/udoc.png)

