class CryptoDataProcessor {
  processMarketData(cryptoData) {
    return {
      totalMarketCap: this.calculateTotalMarketCap(cryptoData),
      averagePrice: this.calculateAveragePrice(cryptoData),
      topGainers: this.getTopGainers(cryptoData),
      topLosers: this.getTopLosers(cryptoData),
      coins: cryptoData
    };
  }

  calculateTotalMarketCap(coins) {
    return coins.reduce((sum, coin) => sum + coin.market_cap, 0);
  }

  calculateAveragePrice(coins) {
    return coins.reduce((sum, coin) => sum + coin.current_price, 0) / coins.length;
  }

  getTopGainers(coins, limit = 5) {
    return coins
      .filter(coin => coin.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, limit);
  }

  getTopLosers(coins, limit = 5) {
    return coins
      .filter(coin => coin.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, limit);
  }
}

module.exports = { CryptoDataProcessor };
