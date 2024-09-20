const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes go here
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});