# Exercises 2.18 - 2.20: Data for Countries

This application was bootstrapped with [Vite](https://vite.dev/) and React for [Full Stack Open - Part 2](https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-18-2-20).

## Exercises Completed

- **2.18\*: Data for countries, step 1**:
  - Fetches country information from the Rest Countries API (`https://studies.cs.helsinki.fi/restcountries/api/all`).
  - Search filter input to find countries by name.
  - Displays:
    - `"Too many matches, specify another filter"` if more than 10 countries match.
    - List of matching country names if 2 to 10 countries match.
    - Detailed country view (capital, area, spoken languages, and flag) when exactly one country matches.

- **2.19\*: Data for countries, step 2**:
  - Added a "show" button next to each country in the list of results (when between 2 and 10 countries match).
  - Clicking "show" displays the complete details view for that specific country.

- **2.20\*: Data for countries, step 3**:
  - Integrated weather data for the capital city of the displayed country using the [OpenWeatherMap API](https://openweathermap.org/).
  - Displays current temperature in Celsius, weather condition icon, and wind speed.
  - Stored API key safely using Vite environment variable `VITE_SOME_KEY` (via `.env` or startup command) to prevent hardcoding secrets.

## Running Locally

1. Install dependencies:
```bash
pnpm install
```

2. (Optional) Set your OpenWeatherMap API key:
   - Create a `.env` file in the `part2/countries` directory:
     ```env
     VITE_SOME_KEY=your_openweathermap_api_key
     ```
   - Or run inline:
     - PowerShell:
       ```powershell
       $env:VITE_SOME_KEY="your_api_key"; pnpm run dev
       ```
     - Bash / macOS / Linux:
       ```bash
       export VITE_SOME_KEY=your_api_key && pnpm run dev
       ```

3. Start development server:
```bash
pnpm run dev
```
