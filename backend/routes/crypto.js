const express = require('express');
const { CryptoService } = require('../services/cryptoService');
const { validateCryptoRequest } = require('../middleware/validation');

const router = express.Router();
const cryptoService = new CryptoService();

router.get('/', validateCryptoRequest, async (req, res) => {
  try {
    const data = await cryptoService.getMarketData();
    res.json(data);
  } catch (error) {
    console.error('Crypto API error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch cryptocurrency data',
      message: error.message 
    });
  }
});

module.exports = router;
