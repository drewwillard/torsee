const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

const mainStreetBusinesses = [
  { name: 'Cafe', x: 0, y: 10 },
  { name: 'Bookstore', x: 1, y: 20 },
  { name: 'Grocery', x: 4, y: 30 },
  { name: 'Grocery', x: 1, y: 30 },
  { name: 'Grocery', x: 3, y: 50 },
  { name: 'Grocery', x: 1, y: 60 },
  { name: 'Grocery', x: 0, y: 70 },
  { name: 'Grocery', x: 3, y: 80 },
  { name: 'Grocery', x: 1, y: 90 },
  { name: 'Grocery', x: 1, y: 100 },
  { name: 'Grocery', x: 3, y: 110 },
  { name: 'Cafe', x: 0, y: 120 },
  { name: 'Bookstore', x: 1, y: 130 },
  { name: 'Grocery', x: 4, y: 140 },
  { name: 'Grocery', x: 1, y: 150 },
  { name: 'Grocery', x: 3, y: 160 },
  { name: 'Grocery', x: 1, y: 170 },
  { name: 'Grocery', x: 0, y: 180 },
  { name: 'Grocery', x: 3, y: 190 },
  { name: 'Grocery', x: 1, y: 200 },
  { name: 'Grocery', x: 1, y: 210 },
  { name: 'Grocery', x: 3, y: 210 },
  // Add more businesses with x values from 0 to 4
];

const broadwayStreetBusinesses = [
  { name: "Broadway Cafe", x: 1 },
  { name: "Theater Royal", x: 0 },
  { name: "Melody Records", x: 3 },
  { name: "Starlight Diner", x: 4 },
  { name: "Broadway Books", x: 1 },
  { name: "Broadway Cafe", x: 1 },
  { name: "Theater Royal", x: 0 },
  { name: "Melody Records", x: 3 },
  { name: "Starlight Diner", x: 4 },
  { name: "Broadway Books", x: 1 },
  { name: "Broadway Cafe", x: 1 },
  { name: "Theater Royal", x: 0 },
  { name: "Melody Records", x: 3 },
  { name: "Starlight Diner", x: 4 },
  { name: "Broadway Books", x: 1 },
  // Add more Broadway businesses as needed
];

app.get('/api/main-street-businesses', async (req, res) => {
  try {
    const { data: businesses, error } = await supabase
      .from('businesses')
      .select('*, business_categories (sub_category_id), sub_categories (id, name, category_id), categories (id, name)');

    if (error) throw error;

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/broadway-street-businesses', (req, res) => {
  res.json(broadwayStreetBusinesses);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});