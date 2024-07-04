# Invoce-Parsing Project

This project is a TypeScript application designed to parse invoice data from XLS files. It uses Express.js for the server-side framework, includes data validation, and is configured with ESLint for linting and Prettier for code formatting. The project also uses Jest for testing and PM2 for process management in production.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [API](#api)
- [Project Structure](#project-structure)

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aaalll/xls-invoices
    cd xls-invoices
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Build the project:

    ```bash
    npm run build
    ```

4. Run the project:

    ```bash
    npm start
    ```



## Scripts

The following scripts are available in the package.json file:

- ```npm start```: Start the application using Node.js
- ```npm run build```: Compile TypeScript code to JavaScript
- ```npm run lint```: Run ESLint to check for linting errors
- ```npm run lint:fix```: Run ESLint and fix linting errors
- ```npm run test```: Run Jest tests
- ```npm run clean```: Remove the dist directory
- ```npm run serve```: Start the application using PM2

## Environment Variables 
This project uses environment variables to configure settings. You can create a .env file in the root of the project to set your environment variables. Here are some example variables:
```NODE_ENV=production```

## Docker

### To build and run the application in a Docker container, follow these steps:
Build the Docker image:

```bash
    docker build -t parser-app .
```
Run the Docker container:

```bash
    docker run -p 3000:3000 parser-app
```

## API

### POST /api/invoices/upload

### Request

- **URL**: `http://localhost:3000/api/invoices/upload?invoicingMonth=YYYY-MM`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body**:
  - `file`: The XLS file to be uploaded.

#### Example

```bash
curl -X 'POST' \
  'http://localhost:3000/api/invoices/upload?invoicingMonth=2023-09' \
  -H 'accept: */*' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/file.xls'
```

#### Response

- **200 OK**: Successfully parsed invoice data.
  ```json
  {
    "data": {
        "invoicingMonth": "Sep 2023",
        "currencyRates": {
            "USD": 3.849,
            "EUR": 4.0575,
            "GBP": 4.7003
        },
        "invoicesData": [
            {
            "customer": "Oracle",
            "customerNumber": 39001,
            "projectType": "Marketing",
            "quantity": 4,
            "pricePerItem": 1,
            "itemPriceCurrency": "USD",
            "totalPrice": 4,
            "invoiceCurrency": "USD",
            "status": "Ready",
            "invoiceTotal": 4,
            "validationErrors": []
            },
        ]
    }
  }
## Project Structure

```plaintext
├── src
│   ├── controllers
│   │   └── invoiceController.ts
│   ├── middlewares
│   │   └── fileUploadMiddleware.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   ├── helper
│   │   │    ├── invoiceTotal.ts
│   │   │    ├── invoiceTotal.test.ts
│   │   │    ├── rowTrasform.ts
│   │   │    └── rowValidation.ts
│   │   ├── validation.ts
│   │   ├── types.ts
│   │   ├── parser.ts
│   │   └── parse.test.ts
│   └── index.ts
├── dist
│   └── (compiled files)
├── routes
│   ├── invoiceRoutes.ts
├── .eslintrc.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── ecosystem.config.js
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md