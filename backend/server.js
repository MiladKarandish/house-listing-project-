import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
import NodeCache from 'node-cache';

const upload = multer({ dest: './uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure required files and directories exist
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
if (!fs.existsSync('./houses.json')) fs.writeFileSync('./houses.json', '[]');

// Middleware
app.use(cors());


//app.use(cors({
  //origin: ['http://keynestery.com'],
  //methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
//}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

app.get('/api/data', async (req, res) => {
  try {
    const cachedData = cache.get('data_key'); // Check if data is in cache
    if (cachedData) {
      return res.json(cachedData); // Send cached data
    }

    const data = await fetchDataFromDatabase(); // Simulate database fetch
    cache.set('data_key', data); // Save data in cache
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

function createNewHouse(data, housesArray) {
  // Auto-generate a unique ID based on the array length
  const newId = housesArray.length > 0 ? housesArray[housesArray.length - 1].id + 1 : 1;

  // Construct a new house object with defaults if fields are missing
  const newHouse = {
    id: newId,
    madeByMe: data.madeByMe ?? true, // Default to false if not provided
    location: {
      street: data.location?.street || '',
      houseNumber: data.location?.houseNumber || '',
      houseNumberAddition: data.location?.houseNumberAddition || '',
      zip: data.location?.zip || '',
      city: data.location?.city || '',
    },
    price: data.price ?? 0, // Default to 0
    size: data.size ?? 0,   // Default to 0
    rooms: {
      bedrooms: data.rooms?.bedrooms ?? 0,
      bathrooms: data.rooms?.bathrooms ?? 0,
    },
    constructionYear: data.constructionYear ?? new Date().getFullYear(), // Default to current year
    hasGarage: data.hasGarage ?? false, // Default to false
    description: data.description || '',
    image: data.image || '',
  };

  // Add the new house to the array
  housesArray.push(newHouse);

  // Return the newly added house
  return newHouse;
}

app.post('/api/houses', (req, res) => {
  const newHouse = createNewHouse(req.body, houses);
  res.status(201).json(newHouse); // Respond with the new house
});

app.post('/api/houses/:id/uploadImage', upload.single('image'), (req, res) => {
  const houseId = parseInt(req.params.id, 10);
  const index = houses.findIndex(h => h.id === houseId);

  if (index === -1) {
    return res.status(404).json({ error: 'House not found' });
  }

  // Save the uploaded file path to the house object
  houses[index].image = `/uploads/${req.file.filename}`;

  fs.writeFileSync('./houses.json', JSON.stringify(houses, null, 2));

  res.json(houses[index]);
});

app.delete('/api/houses/:id', (req, res) => {
  const houseId = parseInt(req.params.id, 10);

  if (isNaN(houseId)) {
    return res.status(400).json({ error: 'Invalid house ID' });
  }

  const index = houses.findIndex((h) => h.id === houseId);
  if (index === -1) {
    return res.status(404).json({ error: 'House not found' });
  }

  // Remove the house from the array and save it temporarily for the response
  const deletedHouse = houses.splice(index, 1)[0];

  // Write the updated data to houses.json
  fs.writeFile('./houses.json', JSON.stringify(houses, null, 2), (err) => {
    if (err) {
      console.error('Error saving houses.json:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(`House with ID ${houseId} deleted successfully`);
    res.json({ message: 'House deleted successfully', house: deletedHouse });
  });
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

// Manually handle address fields
if (req.body.street || req.body.houseNumber || req.body.houseNumberAddition || req.body.zip || req.body.city) {
  houses[index].location = {
    ...houses[index].location, // Keep existing fields
    street: req.body.street || houses[index].location.street,
    houseNumber: req.body.houseNumber || houses[index].location.houseNumber,
    houseNumberAddition: req.body.houseNumberAddition || houses[index].location.houseNumberAddition,
    zip: req.body.zip || houses[index].location.zip,
    city: req.body.city || houses[index].location.city,
  };
}

if (req.body.bedrooms || req.body.bathrooms) {
  houses[index].rooms = {
    ...houses[index].rooms,
    bedrooms: req.body.bedrooms !== undefined ? req.body.bedrooms : houses[index].rooms.bedrooms,
    bathrooms: req.body.bathrooms !== undefined ? req.body.bathrooms : houses[index].rooms.bathrooms,
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

