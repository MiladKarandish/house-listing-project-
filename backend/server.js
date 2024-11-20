import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import multer from 'multer';
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
app.use(cors({ origin: ['http://localhost:5173'], methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type'] }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));

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
  const validatedHouses = houses.map((house) => ({
    id: house.id || null,
    location: house.location || { street: '', houseNumber: '', zip: '', city: '' },
    price: house.price || 0,
    size: house.size || 0,
    rooms: house.rooms || { bedrooms: 0, bathrooms: 0 },
    constructionYear: house.constructionYear || null,
    hasGarage: house.hasGarage || false,
    description: house.description || '',
    image: house.image ? `${req.protocol}://${req.get('host')}${house.image}` : null,
  }));

  console.log('Validated Houses:', validatedHouses); // Add this
  res.json(validatedHouses);
});


// Other routes and file upload remain unchanged...

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
