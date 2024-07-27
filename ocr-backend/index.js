const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const mongoose = require('mongoose');
const cors = require('cors');
const Image = require('./models/Image'); 

const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/ocrdb';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  Tesseract.recognize(req.file.path, 'eng', { logger: m => console.log(m) })
    .then(result => {
      const extractedText = result.data.text;
      const newImage = new Image({
        originalName: req.file.originalname,
        analysisResult: extractedText
      });

      newImage.save()
        .then(() => {
          res.json({ text: extractedText });
        })
        .catch(err => {
          res.status(500).send('Error saving to database.');
        });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});