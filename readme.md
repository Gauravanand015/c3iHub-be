## Project Overview

This Express API provides endpoints for user authentication and CRUD operations for managing products. It includes user registration, login, authentication using JWT, and operations to create, read, update, and delete products.

## Installation

1. Run `npm install` to install dependencies.

## Dependencies

- express
- bcrypt
- jsonwebtoken
- dotenv
- mongoose (assuming it's used for database interaction)

## Configuration

1. Create a `.env` file in the root directory.
2. Add your environment variables, including `SECRET_KEY` for JWT.

## Endpoints

- `POST /register`: Register a new user.
- `POST /login`: Login with existing credentials.
- `POST /product`: Create a new product (authentication required).
- `PATCH /product/:productId`: Update a product by ID (authentication required).
- `DELETE /product/:productId`: Delete a product by ID (authentication required).
- `GET /products`: Get all products, with optional filtering by title and sorting (authentication required).

## Authentication

- User registration and login are required to access protected routes.
- JWT is used for token-based authentication.
- The `authentication` middleware verifies the JWT token before allowing access to protected routes.

## Usage

1. Register a new user using `POST /register`.
2. Login with your credentials using `POST /login` to obtain a JWT token.
3. Use the obtained token in the Authorization header for authenticated requests.
4. Access product-related endpoints for CRUD operations.

## Start Command

To start the application, run: `npm start`
