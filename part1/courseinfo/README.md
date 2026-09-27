# Exercises 1.1 - 1.5: Course Information

This application was bootstrapped with [Vite](https://vite.dev/) and React for [Full Stack Open - Part 1](https://fullstackopen.com/en/part1/java_script#exercises-1-3-1-5).

## Exercises Completed

- **1.1: course information, step1**: Refactored the app into three components: `Header`, `Content`, and `Total`.
- **1.2: course information, step2**: Refactored `Content` to use three separate `Part` components.
- **1.3: course information, step3**: Refactored `part1`, `part2`, and `part3` into separate JavaScript objects with `name` and `exercises`.
- **1.4: course information, step4**: Combined the parts into a single array `parts = [ ... ]` and passed it down to `Content` and `Total`.
- **1.5: course information, step5**: Combined the course name and parts array into a single `course` object:
  ```javascript
  const course = {
    name: 'Half Stack application development',
    parts: [ ... ]
  }
  ```
  and updated `Header`, `Content`, and `Total` to consume this unified data structure.

## Running Locally

```bash
npm install
npm run dev
```
