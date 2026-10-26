# Personal Assistant Backend

## Project Description

This is a Node.js backend project developed as part of the
Personal Assistant project.

## Technologies Used

- Node.js
- JavaScript
- HTTP Module
- Environment Variables

## Project Setup

1. Install Node.js.
2. Open the project folder in the terminal.
3. Run the following command:

   npm install

## Run the Server

node server.js

## API Endpoints

### 1. Home API

GET /

Returns a welcome message.

### 2. Health API

GET /health

Checks whether the server is running.

### 3. About API

GET /about

Returns the application name and version.

### 4. Calculate API

GET /calculate?operation=add&a=10&b=5

Supports the following operations:

- add
- subtract
- multiply

## Environment Variables

The .env file contains:

- PORT
- APP_NAME

## Utility Functions

The utils.js file contains:

- getCurrentDate()
- add(a, b)
- subtract(a, b)
- multiply(a, b)
- formatResponse(message, data)