# JWT Notes

A notes app built to learn authentication with JSON Web Tokens and how a REST API and a React client work together as separate apps.

🔗 [Live Demo](https://jwt-notes.vercel.app)

> The API runs on Render's free plan, so the first request after a while can take a bit longer while the server wakes up.

## Features

- Sign up and log in with JSON Web Tokens
- Create, edit and delete personal notes
- Each note belongs to its user: trying to access someone else's note returns 403
- Profile page: change username, change password (asks for the current one) and delete the account with all its notes
- Protected routes on the client: logged-out users are sent to the login, and an expired token logs you out

## How authentication works

The API and the client are two separate apps. The API never renders pages, it only answers with JSON.

When you log in, the API signs a JWT that only contains your user id and expires after one hour. The client keeps it in `localStorage` and sends it with every request in the `Authorization: Bearer <token>` header, through a small `fetch` wrapper.

The server doesn't store any sessions: a middleware checks the token's signature and expiry on every protected route and reads the user id from it. If the API answers 401, the client clears the token and goes back to the login.

CORS only lets the client's own origin read the API's responses from a browser.

## Built with

**API**

- Node.js
- Express
- PostgreSQL (Neon)
- Prisma
- jsonwebtoken
- bcryptjs
- cors

**Client**

- React
- React Router
- Vite
- CSS Modules

**Deployment**

- Render (API)
- Vercel (client)
