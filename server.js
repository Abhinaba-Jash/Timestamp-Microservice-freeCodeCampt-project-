// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Timestamp route
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  let date;
  if (!dateParam) {
    date = new Date(); // current time
  } else if (!isNaN(dateParam)) {
    // if it's a timestamp string like '1451001600000'
    date = new Date(parseInt(dateParam));
  } else {
    // try parsing as date string
    date = new Date(dateParam);
  }

  // check validity
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
