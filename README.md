# Social Network API

A backend API for a social networking application where users can create accounts, share thoughts, react to others' thoughts, and manage a list of friends. Built with **Express.js**, **MongoDB**, and **Mongoose**, and tested using **Insomnia**.

## 🧠 Features

### Users
- Create a new user
- View all users or a single user by ID
- Update or delete a user
- Add or remove friends from a user’s friend list

### Thoughts
- Post a new thought linked to a user
- View all thoughts or a single thought by ID
- Update or delete thoughts
- Automatically remove thought references when deleted

### Reactions
- Add a reaction to a specific thought
- Delete a reaction from a thought
- Reactions are stored as subdocuments within the `Thought` model

## 📂 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- TypeScript
- Insomnia (for route testing)

## 📁 File Structure

```
src/
├── config/
│   └── connection.ts        # Mongoose connection logic
├── controllers/             # Request handlers for each model
├── models/                  # Mongoose schemas and models
├── routes/                  # Express routes
├── server.ts                # App entry point
```

## 🧪 API Testing Instructions

You can test all API endpoints using [Insomnia](https://insomnia.rest/) or Postman:

### User Routes
```
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id

POST    /api/users/:userId/friends/:friendId
DELETE  /api/users/:userId/friends/:friendId
```

### Thought Routes
```
GET     /api/thoughts
GET     /api/thoughts/:id
POST    /api/thoughts
PUT     /api/thoughts/:id
DELETE  /api/thoughts/:id
```

### Reaction Routes
```
POST    /api/thoughts/:thoughtId/reactions
DELETE  /api/thoughts/:thoughtId/reactions/:reactionId
```

## 🎥 Walkthrough Video

[Watch the walkthrough demo here](https://drive.google.com/file/d/1ASwkYNYynwjvfpSKRKPZNqbsPjZPuorj/view?usp=sharing)  


## ⚖️ License

This project is licensed under the [MIT License](LICENSE).
