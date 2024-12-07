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
app.use('/uploads', express.static('uploads'));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

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
      image: house.image ? `${req.protocol}://${req.get('host')}${house.image}` : null,

    }));
    res.json(validatedHouses);
  } catch (err) {
    console.error('Error processing houses:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/houes/:id', (req, res) => {
  const houseId = parseInt(req.params.id, 10);
  if (isNaN(houseId)) {
    return res.status(400).json({ error: 'Invalid house ID' });
  }

  const house = houses.find(h => h.id === houseId);
  if (house) {
    res.json(house);
  } else {
    res.status(404).json({ error: 'House not found' });
  }
});

app.get('/api/uploads/:id', (req, res) => {
  const uploadsId = parseInt(req.params.id, 10); // Get and parse the upload ID
  if (isNaN(uploadsId)) {
    return res.status(400).json({ error: 'Invalid upload ID' });
  }

  const upload = uploads.find(u => u.id === uploadsId); // Search for the upload by ID
  if (upload) {
    res.json(upload); // Return the upload details if found
  } else {
    res.status(404).json({ error: 'Image not found' }); // Return 404 if not found
  }
});




app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
