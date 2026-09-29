# Exercises 2.6 - 2.11: The Phonebook

This application was bootstrapped with [Vite](https://vite.dev/) and React for [Full Stack Open - Part 2](https://fullstackopen.com/en/part2/getting_data_from_server#exercise-2-11).

## Exercises Completed

- **2.6: The Phonebook Step 1**: Implemented adding names to the phonebook using controlled input elements and state management.
- **2.7: The Phonebook Step 2**: Added duplication checking to prevent duplicate names and show an alert if an existing name is submitted.
- **2.8: The Phonebook Step 3**: Expanded the form and data structure to accept and display phone numbers.
- **2.9\*: The Phonebook Step 4**: Added search/filtering functionality to filter displayed people case-insensitively.
- **2.10: The Phonebook Step 5**: Refactored the application by extracting reusable components (`Filter`, `PersonForm`, `Persons`, and `Person`) while maintaining state in `App`.
- **2.11: The Phonebook Step 6**: Configured `db.json` with initial data and fetched the persons array on component mount via `axios` within `useEffect`.

## Running Locally

1. Start the JSON Server (port 3001):
```bash
pnpm run server
```

2. Start the Vite React app:
```bash
pnpm run dev
```
