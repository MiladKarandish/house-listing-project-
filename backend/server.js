import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import multer from 'multer';

const app = express();
const PORT = 5000;

app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increase JSON payload size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded data

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

// Get all houses
app.get('/api/houses', (req, res) => {
  res.json(
    houses.map((house) => {
      return {
        ...house,
        image: house.image ? 'http://localhost:' + PORT + house.image : null,
      };
    })
  );
});

// Get house by ID
app.get('/api/houses/:id', (req, res) => {
  const houseId = parseInt(req.params.id, 10); // Parse the `id` from the request
  const house = houses.find((h) => h.id === houseId); // Find the house by ID

  if (!house) {
    return res.status(404).json({ message: 'House not found' }); // Return 404 if not found
  }

  res.json({
    ...house,
    image: house.image ? 'http://localhost:' + PORT + house.image : null,
  });
});

// Create a new house
app.post('/api/houses', (req, res) => {
  try {
    console.log('Payload received:', req.body);

    // Destructure incoming formData fields
    const {
      streetName,
      houseNumber,
      numberAddition,
      zip,
      city,
      price,
      size,
      bedrooms,
      bathrooms,
      constructionYear,
      hasGarage,
      description,
    } = req.body;

    // Build the location and rooms objects
    const location = {
      street: streetName || '',
      houseNumber: houseNumber || '',
      houseNumberAddition: numberAddition || '', // Optional field
      zip: zip || '',
      city: city || '',
    };

    const rooms = {
      bedrooms: parseInt(bedrooms, 10) || 0,
      bathrooms: parseInt(bathrooms, 10) || 0,
    };

    // Create the new house object
    const newHouse = {
      id: houses.length + 1,
      location,
      price: parseFloat(price) || 0,
      size: parseFloat(size) || 0,
      rooms,
      constructionYear: parseInt(constructionYear, 10) || null,
      hasGarage: hasGarage === 'true',
      description: description || '',
      image: null, // Default until the image is uploaded
    };

    // Add the new house to the array
    houses.push(newHouse);

    // Save the updated array to the houses.json file
    fs.writeFile('./houses.json', JSON.stringify(houses, null, 2), (err) => {
      if (err) {
        console.error('Error writing to houses.json:', err);
        return res.status(500).json({ message: 'Failed to save house' });
      }
      res.status(201).json(newHouse);
    });
  } catch (error) {
    console.error('Error creating house:', error);
    res.status(400).json({ message: 'Invalid payload structure' });
  }
});

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // 'uploads/' directory

// Upload an image for a house
app.post('/api/houses/:id/upload', upload.single('image'), (req, res) => {
  const houseId = parseInt(req.params.id, 10);
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const houseIndex = houses.findIndex((h) => h.id === houseId);
  if (houseIndex === -1) {
    return res.status(404).json({ message: 'House not found' });
  }

  // Update the house's image path
  houses[houseIndex].image = `/uploads/${file.filename}`;

  // Save the updated houses array
  fs.writeFile('./houses.json', JSON.stringify(houses, null, 2), (err) => {
    if (err) {
      console.error('Error writing to houses.json:', err);
      return res.status(500).json({ message: 'Failed to save file data' });
    }

    res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${file.filename}` });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

