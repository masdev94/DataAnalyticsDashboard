const validateCryptoRequest = (req, res, next) => {
  next();
};

const validateGitHubRequest = (req, res, next) => {
  next();
};

const validateWeatherRequest = (req, res, next) => {
  const { city } = req.params;
  
  if (!city || city.trim().length === 0) {
    return res.status(400).json({ 
      error: 'City parameter is required' 
    });
  }
  
  if (city.trim().length < 2) {
    return res.status(400).json({ 
      error: 'City name must be at least 2 characters long' 
    });
  }
  
  next();
};

module.exports = {
  validateCryptoRequest,
  validateGitHubRequest,
  validateWeatherRequest
};
