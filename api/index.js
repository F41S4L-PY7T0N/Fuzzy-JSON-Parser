const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// Fuzzy JSON parser function
function fuzzyJsonParse(input) {
  try {
    // Try normal JSON.parse first
    return { result: JSON.parse(input), error: null };
  } catch (e) {
    // Attempt to fix common JSON issues
    let fixed = input
      .replace(/\,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Ensure property names are quoted
      .replace(/'/g, '"'); // Replace single quotes with double quotes
    try {
      return { result: JSON.parse(fixed), error: null };
    } catch (err) {
      return { result: null, error: 'Unable to parse JSON. Please check your input.' };
    }
  }
}

app.post('/fuzzy-parse', (req, res) => {
  const { json } = req.body;
  if (typeof json !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid json field.' });
  }
  const { result, error } = fuzzyJsonParse(json);
  if (error) {
    return res.status(400).json({ error });
  }
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Fuzzy JSON Parser API running on port ${PORT}`);
});
