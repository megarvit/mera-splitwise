# Mera Splitwise

A simple expense sharing API built with Express, Sequelize, and SQLite.
This project provides user authentication, expense creation, participant tracking, activity logs, and balance calculation.

## Tech stack

- Node.js
- Express
- Sequelize ORM
- SQLite
- JSON Web Tokens (JWT)
- bcrypt / bcryptjs

## Features

- User signup and login
- Protected routes with JWT authentication
- Create, read, update, and delete expenses
- Track expense participants and individual owed amounts
- Activity logs for expense actions
- Balance calculation for user debts and credits

## Getting started

### Prerequisites

- Node.js installed
- npm available

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

The app listens on `http://localhost:3000` by default.

## Environment

Create a `.env` file in the project root to override the default JWT secret:

```env
JWT_SECRET=your_secret_here
```

If `JWT_SECRET` is not provided, the app defaults to `splitwise_secret`.

## API routes

### Authentication

- `POST /auth/signup`
  - Body: `{ "name": string, "email": string, "password": string }`
  - Response: user details + JWT token

- `POST /auth/login`
  - Body: `{ "email": string, "password": string }`
  - Response: user details + JWT token

### User profile (authenticated)

- `GET /users/profile`
  - Returns the current user's profile

- `PUT /users/profile`
  - Body: `{ "name"?, "email"?, "currency"? }`
  - Updates the current user's profile

- `DELETE /users/profile`
  - Deletes the current authenticated user

### Expenses (authenticated)

- `POST /expenses`
  - Body:
    ```json
    {
      "description": "Lunch",
      "amount": 120,
      "currency": "INR",
      "paidBy": 1,
      "participants": [1, 2, 3],
      "expenseDate": "2026-05-20"
    }
    ```
  - Creates a new expense and participant records

- `GET /expenses`
  - Lists all expenses where the authenticated user is a participant

- `GET /expenses/:id`
  - Fetches an expense by ID, including participants

- `PUT /expenses/:id`
  - Body: same shape as create
  - Updates the expense and its participant list

- `DELETE /expenses/:id`
  - Deletes the expense and related participants

### Balances (authenticated)

- `GET /balances`
  - Returns calculated balances for the authenticated user:
    - `GET_BACK` when others owe the user
    - `YOU_OWE` when the user owes others

### Activities (authenticated)

- `GET /activities`
  - Returns recent activity logs for expenses involving the authenticated user

- `GET /activities/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
  - Returns filtered activity logs within a date range

## Database

The app uses SQLite via `./database.sqlite`.
Sequelize models are defined in `src/models/`:

- `User`
- `Expense`
- `ExpenseParticipant`
- `ActivityLog`

## Project structure

- `src/server.js` - app entrypoint
- `src/config/database.js` - Sequelize/SQLite config
- `src/routes/` - Express route definitions
- `src/controllers/` - request handlers
- `src/models/` - Sequelize models
- `src/services/` - balance calculation logic
- `src/middleware/authMiddleware.js` - JWT auth middleware

## Notes

- Do not commit `node_modules`
- Use `git rm -r --cached node_modules` if `node_modules` is already tracked
- If using Windows with native SQLite bindings, reinstall `npm install` or run `npm rebuild sqlite3 --build-from-source`

## License

ISC
