const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const cryptoRoutes = require('./routes/crypto');
const githubRoutes = require('./routes/github');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/crypto', cryptoRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
