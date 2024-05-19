# Netflix Clone

A fully responsive web application that mimics the user interface and functionality of Netflix. This project demonstrates my proficiency in front-end and back-end development, database management, and API integration.

## Key Features

1. User Authentication

- Paswordless login functionality with Magic Link.
- Token hashing and secure authentication using JWT (JSON Web Tokens).

2. Responsive Design

- Mobile-first design.
- Use of CSS frameworks like Bootstrap or Tailwind CSS for responsiveness.

3. Dynamic Content

- Fetch and display movies and TV shows from a Youtube API.
- Categorized content by query and most popular videos.
- Rating service for like or dislike video.

4. Video Playback

- Integrate video player for content streaming.
- Support for video playback controls (play, pause, seek).

## Tech Stack

- Frontend
  - HTML, CSS, Javascript
  - Next.js for building dynamic user interface
  - Tailwind css for styling with utility class
- Backend
  - Next.js api routes for serverless function
  - GraphQL query for request specific data
  - JWT for signing and verify token
- Database
  - PostgreSQL integrated with GraphQL query
- API's
  - Integration with Youtube API
  - Paswordless authentication api with Magic
  - Hasura for generating GraphQL schemas and resolver
- DevOps
  - Deployment on Vercel cloud server

<!--
## Learning Outcomes

By completing this project, you'll gain hands-on experience in:

- Full-stack web development.
- Integrating third-party APIs.
- Managing user authentication and authorization.
- Building responsive and interactive UIs.
- Deploying web applications to production environments.
- Handling state management in large-scale applications.
 -->

## API Documentation

### POST "/api/login"

- Description: Fetch user to login and signing token
- Headers:
  - Authorization: `Bearer ${didToken}`

### POST "/api/logout"

- Description: Fetch user to logout and removing token
- Headers:
  - Authorization: `Bearer ${didToken}`

### POST "/api/stats"

- Description: Fetch rating service for inserting or updating stats of video
- Body:
  - videoId (string): Video Id
  - favourited (number 1 or 0): Like or Dislike
- Responses: -->
  - 200: { userId: string, videoId: string, favourited: number, watched: boolean }

### GET "/api/stats?videoId=${videoId}"

- Description: Fetch like or dislike service by videoId
- Parameters:
  - videoId (string): Video Id
- Responses: -->
  - 200: { id: string, userId: string, videoId: string, favourited: number, watched: boolean }

# .env.local

In the root directory of your project, add the file `.env.local` with the following environment variables:

- `YOUTUBE_API_KEY`: Your Google Cloud Console APIs Credentials.
- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY`: Your Magic application's publishable API key.
- `MAGIC_SERVER_KEY`: Your Magic application's server key.
- `DEVELOPMENT`: Boolean value that affects the API usage, indicating whether it's for development purposes or not.
- `NEXT_PUBLIC_HASURA_ADMIN_URL`: Your Hasura application's database url.
- `NEXT_PUBLIC_HASURA_ADMIN_SECRET`: Your Hasura application's admin secret.
- `JWT_SECRET`: Your JWT secret or private key used for signing.
