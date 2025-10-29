# Upwork P257 Test API

A Node.js Express API built with TypeScript that provides user management functionality with PostgreSQL database integration.

## Features

- User creation and management
- Points system for users
- Top 5 users leaderboard
- Input validation with Joi
- PostgreSQL database with Prisma ORM
- TypeScript support
- ESLint and Prettier configuration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Joi
- **Linting**: ESLint
- **Formatting**: Prettier

## Project Structure

```
src/
├── controllers/     # Request handlers
├── data/           # Environment configuration
├── prisma/         # Database schema
├── routes/         # API routes
├── types/          # TypeScript type definitions
├── utils/          # Utility functions and enums
└── validators/     # Input validation schemas
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by updating [.env](.env):
   ```env
   PORT=3000
   URL=http://localhost:3000
   ENV=dev
   PG_DATABASE_URL=postgres://username:password@localhost:5432/database_name
   ```

   Or rename `dev.env` to `.env`
      `PG_DATABASE_URL` value replace by your postgres database connection

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma db push
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server

## API Endpoints

### Users

- `POST /users` - Create multiple users
        - Request Body 
            {
                "users": [
                    {
                        "username": {{username}} ## 
                        "name": {{name}} ##
                        "profilePicture": {{Profile Picture}} ##
                    }
                ]
            }
- `POST /users/points` - Update user points
         - Request Body
            {
               "points": [
                  {
                        "username": {{username}} ## 
                        "point": {{Point}} ##
                  }
               ]
            }
- `GET /users/top5/total` - Get top 5 users by total points
- `GET /users/top5/single` - Get top 5 users by single entry


## License

MIT

## Author

Bishal Kuiry
