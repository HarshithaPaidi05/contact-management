# Contact Management System

The Contact Management System is a web application designed to simplify the management of personal and professional contacts. Users can create, update, view, and delete contacts with ease. The app ensures data integrity and consistency with strong backend validations.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [Project Description](#project-description)
- [Technical Decisions](#technical-decisions)
- [How It Works](#how-it-works)

## Setup Instructions

### Prerequisites

- Node.js (>=12.x)
- npm (>=6.x)
- MongoDB (>=4.4)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/harshithapaidi05/contact-management-system.git
    cd contact-management-system
    ```

2. Install the server dependencies:
    ```bash
    cd contact-management-backend
    npm install
    ```

3. Install the client dependencies:
    ```bash
    
    npm install
    ```

### Running the Application

1. Start the MongoDB server:
    ```bash
    mongod
    ```

2. Start the backend server:
    ```bash
    node server.js
    ```

3. Start the frontend client:
    ```bash
    npm start
    ```

4. Open the application in your browser:
    ```plaintext
    http://localhost:3000
    ```

## Database Schema

### Contact Schema

```json
{
  "firstName": "String, required",
  "lastName": "String, required",
  "email": "String, required, unique, match: /^\\S+@\\S+\\.\\S+$/",
  "phoneNumber": "String, required, validate: {validator: /^\\d{10}$/}",
  "company": "String, required",
  "jobTitle": "String, required"
}

##Project Description
A web application for managing contacts with a focus on user-friendly interface and robust backend validations.

##Technical Decisions
Node.js and Express: Chosen for the backend to handle API requests and manage data operations with MongoDB.

MongoDB: Selected for its flexibility and scalability as the database.

React: Used for building the user interface, leveraging Material-UI for components and styling.

Axios: Employed for making HTTP requests from the frontend to the backend.

Validation: Implemented both frontend and backend validations to ensure data integrity.

##How It Works
Backend
API Endpoints:

GET /api/contacts: Fetch all contacts.

POST /api/contacts: Create a new contact.

PUT /api/contacts/:id: Update an existing contact.

DELETE /api/contacts/:id: Delete a contact.

Validation: Ensures email and phone number formats are correct and fields are required.

Frontend
React Components:

App: Main component that contains the state and layout.

ContactForm: Form for creating and editing contacts.

ContactsTable: Table displaying the list of contacts.

Styling: Uses Material-UI for a consistent and modern look.

Error Handling: Provides user feedback for validation errors and server responses.



