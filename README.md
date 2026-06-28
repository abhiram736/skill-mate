# SkillMate

## Overview

SkillMate is a MERN Stack web application designed to connect individuals who want to share knowledge and learn new skills. The platform enables users to create profiles, showcase their expertise, discover other users, and exchange skills through a structured request system.

The project promotes collaborative learning by creating opportunities for users to teach skills they possess and learn skills they are interested in.

---

## Features

### User Management
- User Registration
- Secure User Login
- JWT-Based Authentication
- Password Encryption using bcrypt

### Profile Management
- Create and Update User Profiles
- Add Skills Offered
- Add Skills Wanted

### Skill Exchange
- Browse Registered Users
- View User Skills
- Send Skill Exchange Requests
- Accept or Reject Requests
- Track Request Status

---

## Technology Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS / Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Tokens (JWT)
- bcrypt.js

---

## System Architecture

```text
SkillMate
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── server
    ├── config
    ├── models
    ├── controllers
    ├── routes
    ├── middleware
    ├── .env
    ├── server.js
    └── package.json
```

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/SkillMate.git
cd SkillMate
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

or

```bash
nodemon server.js
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |

### User Management

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get user profile |
| PUT | /api/users/profile | Update profile |

### Skill Requests

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/request/send | Send skill exchange request |
| GET | /api/request | View requests |
| PUT | /api/request/:id | Accept or reject request |

---

## Project Workflow

1. User registers on the platform.
2. User logs in securely.
3. User updates profile information.
4. User adds skills offered and skills wanted.
5. User browses other registered users.
6. User sends a skill exchange request.
7. The recipient accepts or rejects the request.
8. The platform updates the request status accordingly.

---

## Future Enhancements

- Real-Time Chat System
- User Ratings and Reviews
- Notification System
- Video Call Integration
- Advanced Skill Search and Filtering
- Recommendation System

---

## Team Contributions

| Module | Responsibility |
|----------|---------------|
| Authentication & Security | User registration, login, JWT authentication |
| User Management | Profile and skill management |
| Request Management | Skill exchange request system |
| Frontend Development | User interface design and implementation |
| Integration & Testing | API integration and application testing |

---

## License

This project was developed as an academic MERN Stack project for learning and educational purposes.
