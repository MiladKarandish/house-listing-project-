import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure required files and directories exist
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
if (!fs.existsSync('./houses.json')) fs.writeFileSync('./houses.json', '[]');

// Middleware
app.use(cors({
  origin: ['https://comfy-longma-ab6c60.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load houses
let houses = [];
fs.readFile('./houses.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading houses.json:', err.message);
    houses = [];
  } else {
    try {
      houses = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing houses.json:', parseError.message);
      houses = [];
    }
  }
});

// Deep merge function for nested object
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = target[key] || {}; // Make sure the target has the same section
      deepMerge(target[key], source[key]); // Merge the details
    } else {
      target[key] = source[key]; // Overwrite or add simple values
    }
  }
  return target;
}


// Routes
app.get('/api/houses', (req, res) => {
  try {
    const validatedHouses = houses.map((house) => ({
      id: house.id || null,
      madeByMe: house.madeByMe || false,
      location: house.location || { street: '', houseNumber: '', zip: '', city: '' },
      price: house.price || 0,
      size: house.size || 0,
      rooms: house.rooms || { bedrooms: 0, bathrooms: 0 },
      constructionYear: house.constructionYear || null,
      hasGarage: house.hasGarage || false,
      description: house.description || '',
      image: house.image
        ? `${req.protocol}://${req.get('host')}${house.image}`
        : null,
    }));
    res.json(validatedHouses);
  } catch (err) {
    console.error('Error processing houses:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/houses/:id', (req, res) => {
  const houseId = parseInt(req.params.id, 10);
  if (isNaN(houseId)) {
    return res.status(400).json({ error: 'Invalid house ID' });
  }

  const house = houses.find((h) => h.id === houseId);
  if (house) {
    res.json({
      ...house,
      image: house.image
        ? `${req.protocol}://${req.get('host')}${house.image}`
        : null,
    });
  } else {
    res.status(404).json({ error: 'House not found' });
  }
});

app.put('/api/houses/:id', (req, res) => {
  const houseId = parseInt(req.params.id, 10);
  console.log('Incoming PUT request:', req.body); // Log incoming data
  if (isNaN(houseId)) {
    return res.status(400).json({ error: 'Invalid house ID' });
  }

  const index = houses.findIndex((h) => h.id === houseId);
  if (index === -1) {
    return res.status(404).json({ error: 'House not found' });
  }

  // Update house data with the new values
  // Merge the general fields
houses[index] = deepMerge(houses[index], req.body);

// Manually handle location fields
if (req.body.streetName || req.body.houseNumber || req.body.zip || req.body.city) {
  houses[index].location = {
    ...houses[index].location, // Preserve existing address fields
    streetName: req.body.streetName || houses[index].location.streetName,
    houseNumber: req.body.houseNumber || houses[index].location.houseNumber,
    numberAddition: req.body.numberAddition || houses[index].location.numberAddition,
    zip: req.body.zip || houses[index].location.zip,
    city: req.body.city || houses[index].location.city,
  };
}


  console.log('Updated house:', houses[index]); // Log updated house

  // Save updated houses to the JSON file
  fs.writeFile('./houses.json', JSON.stringify(houses, null, 2), (err) => {
    if (err) {
      console.error('Error saving houses.json:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('houses.json updated successfully'); // Log success
    res.json(houses[index]);
  });
  
});


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

