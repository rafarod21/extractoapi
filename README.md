# ExtractoAPI

ExtractoAPI is a robust and scalable API built with Node.js, Express, and Prisma, designed to extract and process data from various sources, including PDFs and web pages. It provides a secure and efficient way to manage user authentication, data storage, and data extraction tasks.

## Features

- **User Authentication:** Secure user registration and login with JWT (JSON Web Tokens).
- **PDF Data Extraction:** Extract text content from PDF documents.
- **Web Scraping:** Scrape data from specified URLs using Cheerio.
- **Data Storage:** Utilizes PostgreSQL with Prisma ORM for efficient data management.
- **Docker Support:** Easy deployment and management with Docker Compose.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **Prisma:** Next-generation ORM for Node.js and TypeScript.
- **PostgreSQL:** Powerful, open-source object-relational database system.
- **Bcrypt.js:** Library for hashing passwords.
- **JSON Web Token (JWT):** For secure authentication.
- **Multer:** Middleware for handling `multipart/form-data`, primarily used for uploading files.
- **PDF-Parse:** A utility to extract text from PDF files.
- **Cheerio:** Fast, flexible, and lean implementation of core jQuery specifically designed for the server.
- **Zod:** TypeScript-first schema declaration and validation library.
- **TypeScript:** Superset of JavaScript that adds static types.
- **Docker & Docker Compose:** For containerization and orchestration.
- **TSX:** TypeScript execution environment for Node.js.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Docker and Docker Compose

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rafarod21/extractoapi.git
   cd extractoapi
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following:

   ```
   DATABASE_URL="postgresql://extracto:extractopass@localhost:5432/extractodb?schema=public"
   JWT_SECRET="your_jwt_secret_key"
   PORT=3000
   ```

   - `DATABASE_URL`: Connection string for your PostgreSQL database. If using Docker Compose, this will be handled automatically within the containers, but for local development outside of Docker, ensure it points to your local PostgreSQL instance.
   - `JWT_SECRET`: A strong, random string used for signing JWTs.
   - `PORT`: The port on which the API server will listen.

4. **Start the database and application (using Docker Compose):**

   ```bash
   npm run docker:up
   ```

   This will:

   - Start the PostgreSQL container in detached mode.
   - Wait for the PostgreSQL database to be ready.
   - Apply any pending Prisma migrations to set up your database schema.
   - Start the ExtractoAPI server.

5. **Stop the aplication:**
   ```bash
   npm run docker:down
   ```

## API Endpoints

The API provides the following main endpoints:

### Clients

- `GET /clients`: Get all clients.
- `GET /clients/:id`: Get a single client by ID.
- `POST /clients`: Create a new client.
- `PUT /clients/:id`: Update a client by ID.
- `PATCH /clients/:id`: Partially update a client by ID.
- `DELETE /clients/:id`: Delete a client by ID.

### Documents

- `POST /documents/pdf/:clientId`: Upload a PDF document for a specific client and extract its content.
- `POST /documents/url/:clientId`: Provide a URL for a specific client and scrape its content.
- `GET /documents/:clientId`: Get all documents associated with a client.

### Health Check

- `GET /health`: Check the health status of the API.

## Testing the API with Postman

A Postman collection is provided to help you test all the API endpoints.

### Import the Postman Collection

1. Open Postman.
2. Click on `File` -> `Import`.
3. Select the `ExtractoAPI.postman_collection.json` file from the root of the cloned repository.

### Set Up Environment Variables in Postman

The Postman collection uses environment variables for `base_url`, `token`, and `client_id`.

1. In Postman, click on the "Environment quick look" eye icon in the top right corner.
2. Click on `Add` to create a new environment, or select an existing one.
3. Add the following variables:

   - `base_url`: `http://localhost:3000` (or the address where your API is running)
   - `token`: Leave empty for now. This will be populated after a successful login.
   - `client_id`: Leave empty for now. This will be populated after creating a client.

4. Select your newly created or updated environment from the dropdown.
5. Ready to go request!
