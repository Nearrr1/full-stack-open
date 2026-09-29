# Exercises 2.6 - 2.17: The Phonebook

This application was bootstrapped with [Vite](https://vite.dev/) and React for [Full Stack Open - Part 2](https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-16-2-17).

## Exercises Completed

- **2.6: The Phonebook Step 1**: Implemented adding names to the phonebook using controlled input elements and state management.
- **2.7: The Phonebook Step 2**: Added duplication checking to prevent duplicate names and show an alert if an existing name is submitted.
- **2.8: The Phonebook Step 3**: Expanded the form and data structure to accept and display phone numbers.
- **2.9\*: The Phonebook Step 4**: Added search/filtering functionality to filter displayed people case-insensitively.
- **2.10: The Phonebook Step 5**: Refactored the application by extracting reusable components (`Filter`, `PersonForm`, `Persons`, and `Person`) while maintaining state in `App`.
- **2.11: The Phonebook Step 6**: Configured `db.json` with initial data and fetched the persons array on component mount via `axios` within `useEffect`.
- **2.12: The Phonebook Step 7**: Persisted new phonebook entries directly to the backend `json-server` via HTTP POST requests.
- **2.13: The Phonebook Step 8**: Extracted backend communication logic into a separate service module (`src/services/persons.js`).
- **2.14: The Phonebook Step 9**: Added functionality to delete entries from the backend server using HTTP DELETE requests, with user confirmation via `window.confirm`.
- **2.15\*: The Phonebook Step 10**: Enabled updating existing contact numbers via HTTP PUT requests when a duplicate name is submitted, with confirmation dialog and error handling if already removed.
- **2.16: Phonebook Step 11**: Created a `Notification` component that displays styled success notifications for 5 seconds when a person is added or their number is updated.
- **2.17\*: Phonebook Step 12**: Added styled error notifications when operations fail (such as attempting to update or delete a person already removed from the server).

## Running Locally

1. Start the JSON Server (port 3001):
```bash
pnpm run server
```

2. Start the Vite React app:
```bash
pnpm run dev
```
