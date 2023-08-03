# DemoNodeApp

DemoNodeApp is a simple Node.js application that allows students to combine their work and create a model-controller link with MongoDB, Express, and Node.js. The application provides APIs for managing customers, authentication (login), and albums. It also includes formatters and middleware for handling JWT (JSON Web Tokens) for secure authentication.

## Getting Started

These instructions will help you set up the DemoNodeApp on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

1. Node.js (Version >= 14.0.0)
2. MongoDB (or have access to a remote MongoDB instance)
3. Git (optional but recommended for version control)

### Installing

1. Clone the repository using Git or download the ZIP and extract it.

```bash
git clone https://github.com/junaidsaleem/DemoNodeApp.git
```
2. Change to the project directory.
```bash
cd DemoNodeApp
```
3. Install the required dependencies using npm
 ```bash
npm install
```

### Running the Application
Start the application by running the following command:

```bash
npm start
```

The application should now be running on the specified port (default: 3000).

### API Endpoints
    The following API endpoints are available in the DemoNodeApp:

    Customers API

        GET /api/customers: Get a list of all customers.
        GET /api/customers/:id: Get a specific customer by ID.
        POST /api/customers: Create a new customer.
        PUT /api/customers/:id: Update an existing customer by ID.
        DELETE /api/customers/:id: Delete a customer by ID.
    Authentication (Login) API

        POST /api/login: Authenticate a user and generate a JWT token.
    Albums API

        GET /api/albums: Get a list of all albums.
        GET /api/albums/:id: Get a specific album by ID.
        POST /api/albums: Create a new album.
        PUT /api/albums/:id: Update an existing album by ID.
        DELETE /api/albums/:id: Delete an album by ID.
### Middlewares
    The application includes the following middleware:
    authMiddleware: A middleware to authenticate API requests using JWT tokens.
### Formatters
    The application includes formatters to handle request and response data in a consistent format.

### Contributing
    If you'd like to contribute to DemoNodeApp, please follow these steps:

    Fork the repository on GitHub.
    Create a new branch from the main branch for your changes.
    Commit your changes and push them to your fork.
    Submit a pull request describing the changes you've made.
    License
    This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments
    We would like to thank all the contributors and libraries used in this project for their support and efforts.
