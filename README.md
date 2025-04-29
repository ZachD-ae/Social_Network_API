# Social Network API

## Description

The Social Network API is a backend application built using Node.js, Express.js, MongoDB, and Mongoose. It provides a NoSQL-based API that allows developers to manage users, their thoughts, reactions to thoughts, and user friendships. This application is designed to handle large amounts of unstructured data efficiently, making it an ideal backend for a social media platform.

The application is tested using Insomnia to perform HTTP requests against a local server.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Technologies Used](#technologies-used)
- [Demo](#demo)
- [License](#license)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ZachD-ae/Social_Network_API.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Social_Network_API
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Ensure MongoDB is installed and running locally on your machine.

---

## Usage

To run the application in development mode with live reloading:

```bash
npm run dev
```

To build and run the application in production mode:

```bash
npm run build
npm run start
```

Once the server is running, use Insomnia (or another API client) to send requests to the API endpoints. The server listens on `http://localhost:3001/` by default.

---

## API Routes

### User Routes

- `GET /api/users` — Get all users
- `GET /api/users/:userId` — Get a single user by ID
- `POST /api/users` — Create a new user
- `PUT /api/users/:userId` — Update a user by ID
- `DELETE /api/users/:userId` — Delete a user by ID
- `POST /api/users/:userId/friends/:friendId` — Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId` — Remove a friend from a user's friend list

### Thought Routes

- `GET /api/thoughts` — Get all thoughts
- `GET /api/thoughts/:thoughtId` — Get a single thought by ID
- `POST /api/thoughts` — Create a new thought
- `PUT /api/thoughts/:thoughtId` — Update a thought by ID
- `DELETE /api/thoughts/:thoughtId` — Delete a thought by ID

### Reaction Routes (nested under thoughts)

- `POST /api/thoughts/:thoughtId/reactions` — Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` — Remove a reaction from a thought

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Insomnia (for API testing)
- TypeScript (if using TS version)

---

## Demo

A walkthrough video demonstrating the API routes, functionality, and testing through Insomnia can be found here:

[Walkthrough Video Link](#)  
*(Walkthrough video not uploaded currently)*

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Notes

- No frontend was built for this application. All functionality is tested through API requests.
- Data validation is handled at the model level using Mongoose schema validation.
- Relationships are managed using MongoDB's references and subdocuments.
