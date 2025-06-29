# Fuzzy-JSON-Parser

A full-stack web app for parsing and correcting malformed JSON with a beautiful, modern UI.

## Features
- **Modern React + Tailwind website**: Input and output panels for JSON, stylish and responsive.
- **Fuzzy JSON API**: Node.js Express backend that attempts to parse and fix broken JSON.
- **One-command runner**: Start both frontend and backend with a single command and see their links in a custom console panel.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```
cd api && npm install
cd ../website && npm install
cd ..
```

### Run the app
```
node runner.js
```
This will start both the API and the website. You will see a panel in the console with their links:

```
==============================
🚀 Fuzzy JSON Parser Running
------------------------------
API:      http://localhost:3001/fuzzy-parse
Website:  http://localhost:5173
==============================
```

- Open the website link in your browser.
- Paste or type (even broken) JSON in the input box and click **Fuzzy Parse**.
- The output box will show the parsed/corrected JSON or an error message.

## Project Structure
```
api/      # Node.js Express backend
website/  # React + Tailwind frontend
runner.js # Starts both servers together
```

## API Endpoint
- **POST** `/fuzzy-parse`
  - Body: `{ "json": "<your-json-string>" }`
  - Returns: `{ result: <parsed object> }` or `{ error: <message> }`

## License
MIT
