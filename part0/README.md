# Part 0: Fundamentals of Web Apps

This directory contains the solutions for exercises 0.4 to 0.6 from [Full Stack Open - Part 0](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#exercises-0-1-0-6).

- [0.4: New note diagram](0.4.md)
- [0.5: Single page app diagram](0.5.md)
- [0.6: New note in Single page app diagram](0.6.md)

---

## 0.4: New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user types a note into the text field and clicks the "Save" button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server receives the POST data, creates a new note, and pushes it to the notes array
    server-->>browser: HTTP 302 Found (Redirect to /exampleapp/notes)
    deactivate server

    Note right of browser: The browser reloads the notes page following the redirect

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser executes the JavaScript code that fetches the JSON data from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes to the DOM
```

---

## 0.5: Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user navigates to https://studies.cs.helsinki.fi/exampleapp/spa

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file (spa.js)
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code (spa.js) that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the event handler callback that renders the notes to the DOM
```

---

## 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user types a note into the text field and clicks the "Save" button

    Note right of browser: The JavaScript code handles the submit event, calls e.preventDefault() to avoid page reload, creates the new note object, appends it to the local notes array, and re-renders the notes list in the DOM immediately

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note over browser,server: Headers: Content-Type: application/json<br/>Payload: { "content": "SPA note", "date": "2024-01-01T..." }
    Note left of server: The server adds the new note to its notes array and responds with 201 Created
    server-->>browser: HTTP 201 Created (JSON: { "message": "note created" })
    deactivate server

    Note right of browser: No page reload or additional HTTP requests are needed because the DOM was already updated locally
```
