# Tribal Rugs Palace - Backend

Welcome to the backend setup for **Tribal Rugs Palace**, an online platform for selling carpets. This repository contains the server-side code for managing products, user authentication, and other essential functionalities.

## Project Setup

### Node Version Required

Ensure you are using Node.js version 18 or later for compatibility with the project's dependencies.

### Packages Used

| Package                   | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `express`                 | Web framework for Node.js                                               |
| `mongoose`                | MongoDB object modeling tool designed for asynchronous environments     |
| `passport`                | Authentication middleware for Node.js                                   |
| `passport-google-oauth20` | Passport strategy for authenticating with Google using OAuth 2.0        |
| `jsonwebtoken`            | JSON Web Token implementation for authentication and authorization      |
| `dotenv`                  | Loads environment variables from a `.env` file                          |
| `express-session`         | Session management middleware for Express                               |
| `nodemon`                 | Development tool that automatically restarts the server on code changes |
| `prettier`                | Code formatter to maintain code style consistency                       |
| `husky`                   | Tool for setting up Git hooks, such as linting and formatting checks    |
| `lint-staged`             | Run linters on pre-committed files                                      |

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/tribal-rugs-palace-backend.git
   cd tribal-rugs-palace-backend
   ```

2. **Install Dependencies**

   Make sure you have npm installed, then run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Development Server**

   To start the server in development mode, use:

   ```bash
   npm run dev
   ```

   This command uses Nodemon to automatically restart the server when file changes are detected.

5. **Run Tests (Optional)**

   To run tests, use:

   ```bash
   npm test
   ```

   This command will execute the tests defined in your project.

## Folder Structure

```
/controllers     # Business logic for handling requests
/models          # Mongoose models for MongoDB collections
/routes          # API routes and endpoint definitions
/middlewares     # Middleware functions for request processing
/config          # Configuration files, e.g., database and passport setup
server.js        # Entry point for the application
```

## Git Hooks and Linting

This project uses Husky and lint-staged to ensure code quality. Git hooks are set up for linting and formatting before commits.

To manually run linting and formatting:

```bash
npm run lint
npm run format
```

## Troubleshooting

- **Port Already in Use**: If you encounter the `EADDRINUSE` error, ensure no other process is using port 5000, or change the port in `server.js`.

- **Deprecated Options Warning**: If you see warnings about deprecated options, update your MongoDB connection code to remove `useNewUrlParser` and `useUnifiedTopology`.
