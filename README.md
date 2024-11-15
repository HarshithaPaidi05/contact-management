# contact-management
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
    cd server
    npm install
    ```

3. Install the client dependencies:
    ```bash
    cd client
    npm install
    ```

### Running the Application

1. Start the MongoDB server:
    ```bash
    mongod
    ```

2. Start the backend server:
    ```bash
    cd server
    npm start
    ```

3. Start the frontend client:
    ```bash
    cd client
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
