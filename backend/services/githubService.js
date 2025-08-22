const axios = require('axios');
const { GitHubDataProcessor } = require('../utils/githubDataProcessor');

class GitHubService {
  constructor() {
    this.baseUrl = 'https://api.github.com';
    this.dataProcessor = new GitHubDataProcessor();
  }

  async getTrendingRepos() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=20`
      );
      
      return this.dataProcessor.processRepositoryData(response.data.items);
    } catch (error) {
      throw new Error(`GitHub API error: ${error.message}`);
    }
  }
}

module.exports = { GitHubService };
