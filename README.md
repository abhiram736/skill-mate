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
- Custom CSS (responsive layout)

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
    ├── .env.example
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

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and a strong JWT secret:

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
| GET | /api/users/me | Get logged-in user profile (auth required) |
| GET | /api/users/:id | Get user profile by ID |
| PUT | /api/users/profile | Update profile (auth required) |

### Skill Requests

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/requests/send | Send skill exchange request (auth required) |
| GET | /api/requests | View your requests (auth required) |
| PUT | /api/requests/:id/accept | Accept a request (auth required, receiver only) |
| PUT | /api/requests/:id/reject | Reject a request (auth required, receiver only) |

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

## Test Plan

Use this checklist to verify the application before submission or demo.

### Prerequisites

- [ ] MongoDB is running and reachable
- [ ] `server/.env` is configured from `.env.example`
- [ ] Backend runs on `http://localhost:5000`
- [ ] Frontend runs on `http://localhost:5173`

### Authentication

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 1 | Register new user | Go to `/register`, fill name/email/password, submit | Redirects to dashboard; user created in DB |
| 2 | Register validation | Submit with empty fields or invalid email | Error message shown; no redirect |
| 3 | Login | Go to `/login`, use valid credentials | Redirects to dashboard; token saved |
| 4 | Login failure | Use wrong password | Error message shown |
| 5 | Protected route | Visit `/dashboard` without logging in | Redirects to `/login` |
| 6 | Logout | Click Logout in navbar | Token cleared; redirected to login |

### Profile Management

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 7 | View profile | Go to `/profile` while logged in | Name and skills load correctly |
| 8 | Update profile | Add skills offered/wanted, click Save | Success message; data persists on refresh |
| 9 | Dashboard stats | Go to `/dashboard` after profile update | Skill counts and pending requests display |

### Browse Users

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 10 | Browse list | Go to `/users` | Other registered users shown (not yourself) |
| 11 | View user detail | Click View Profile on a user card | `/users/:id` shows their skills |
| 12 | Empty browse | Only one user exists in system | Browse page shows empty state message |

### Skill Requests

| # | Test Case | Steps | Expected Result |
|---|-----------|-------|-----------------|
| 13 | Send request | Log in as User A, go to `/requests`, select User B, fill skills, submit | Request appears with status `Pending` |
| 14 | Duplicate request | Send another pending request to same user | Error: request already sent |
| 15 | Accept request | Log in as User B, click Accept | Status changes to `Accepted` |
| 16 | Reject request | Log in as User B, click Reject on a pending request | Status changes to `Rejected` |
| 17 | Unauthorized action | User A tries to accept a request sent to User B | Request not actionable for User A |

### API Smoke Test (optional)

```bash
# Health check
curl http://localhost:5000/

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"secret123"}'
```

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
