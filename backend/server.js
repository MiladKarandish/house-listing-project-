import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Load existing houses from JSON file
let houses = [];
fs.readFile('./houses.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading houses.json:', err);
  } else {
    houses = JSON.parse(data);
    console.log('Loaded initial houses from houses.json');
  }
});

// Routes
app.get('/api/houses', (req, res) => {
  res.json(houses);
});

app.post('/api/houses', (req, res) => {
  const { location, price, size, rooms } = req.body;
  const parsedLocation = JSON.parse(location);
  const parsedRooms = JSON.parse(rooms);

  const newHouse = {
    id: houses.length + 1,
    location: parsedLocation,
    price: parseFloat(price),
    size: parseFloat(size),
    rooms: parsedRooms,
  };
  houses.push(newHouse);
  fs.writeFile('./houses.json', JSON.stringify(houses, null, 2), (err) => {
    if (err) {
      console.error('Error writing to houses.json:', err);
    } 
  });
  
  res.status(201).json(newHouse);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
