const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');



require('dotenv').config();

const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors())
// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use('/songs', express.static(path.join(__dirname, 'uploads')));

// Define a default route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the music player backend');
});

// Define a route to serve music files
app.get('/music/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});

// Define a route to handle song uploads
app.post('/upload', upload.single('song'), (req, res) => {
  res.send('Song uploaded successfully');
});

// Define a route to fetch a list of songs
app.get('/songs', (req, res) => {
    
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
        
      const songs = files.map(file => ({ name: file, url: `/${file}` }));
      res.json(songs);
    }
  });
  
});

fetch('http://localhost:5000/songs', {
  mode: 'no-cors'
})
.then(response => {
  // Handle the response (note: limited access to response)
})
.catch(error => {
  console.error('Fetch error:', error);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
