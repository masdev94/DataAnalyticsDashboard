const axios = require('axios');
const { CryptoDataProcessor } = require('../utils/cryptoDataProcessor');

class CryptoService {
  constructor() {
    this.baseUrl = 'https://api.coingecko.com/api/v3';
    this.dataProcessor = new CryptoDataProcessor();
  }

  async getMarketData() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
      );
      
      return this.dataProcessor.processMarketData(response.data);
    } catch (error) {
      throw new Error(`CoinGecko API error: ${error.message}`);
    }
  }
}

module.exports = { CryptoService };
