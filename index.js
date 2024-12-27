const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./movieRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(movieRoutes);

const PORT = process.env.PORT || 4321;

mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error(err));