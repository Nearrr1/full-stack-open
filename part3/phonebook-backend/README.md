# Exercises 3.1 - 3.6: Phonebook backend

This is the backend for the Phonebook application built with Node.js and Express for [Full Stack Open - Part 3](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6).

## Exercises Completed

- **3.1: Phonebook backend step 1**: Implemented an Express application serving a hardcoded list of phonebook entries from `/api/persons`. Configured `npm start` and `npm run dev` (`node --watch index.js`).
- **3.2: Phonebook backend step 2**: Added the `/info` endpoint displaying the count of phonebook entries and the request timestamp.
- **3.3: Phonebook backend step 3**: Added support for fetching a single phonebook entry by ID (`GET /api/persons/:id`), returning 404 Not Found if not found.
- **3.4: Phonebook backend step 4**: Added HTTP DELETE support (`DELETE /api/persons/:id`) to remove an entry, responding with status 204 No Content.
- **3.5: Phonebook backend step 5**: Implemented adding new entries (`POST /api/persons`) with JSON body parsing and unique ID generation using `Math.random`.
- **3.6: Phonebook backend step 6**: Implemented error handling and validation for POST requests:
  - Missing name or number responds with status 400 Bad Request.
  - Duplicate name responds with status 400 Bad Request and `{ error: 'name must be unique' }`.

## Testing

REST client request definitions are included in the [requests](requests/) directory:
- [get_all_persons.rest](requests/get_all_persons.rest)
- [get_info.rest](requests/get_info.rest)
- [get_single_person.rest](requests/get_single_person.rest)
- [create_person.rest](requests/create_person.rest)
- [delete_person.rest](requests/delete_person.rest)

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start in development mode (with auto-reload):
```bash
npm run dev
```

3. Start in production mode:
```bash
npm start
```
