# Phonebook Backend

Exercises for Full Stack Open Part 3.

## Completed Exercises

- 3.1-3.6: Express phonebook API with `/api/persons`, `/info`, single-person lookup, delete, create, request logging, and request validation.
- 3.7-3.8: Morgan logging with request body logging for POST requests.
- 3.9-3.11: Frontend configured to use the backend API and production build served from `dist`.
- 3.12: MongoDB command-line helper in `mongo.js`.
- 3.13-3.18: MongoDB persistence through Mongoose, database-backed create/read/update/delete, and error handling middleware.
- 3.19-3.21: Person validation for name length, phone number format, duplicate names, and frontend error notifications. The production frontend build is included in `dist`.
- 3.22: ESLint configuration and `npm run lint`.

## Notes

The public deployment URL required by exercises 3.10 and 3.21 cannot be verified from this local repository. The backend is ready to deploy with:

```bash
npm install
npm run build:ui
npm start
```

Set `MONGODB_URI` in the deployment environment before starting the server.

## Local Development

```bash
npm install
npm run dev
```

REST client request definitions are included in the `requests` directory.
