const express = require('express');
const { GitHubService } = require('../services/githubService');
const { validateGitHubRequest } = require('../middleware/validation');

const router = express.Router();
const githubService = new GitHubService();

router.get('/', validateGitHubRequest, async (req, res) => {
  try {
    const data = await githubService.getTrendingRepos();
    res.json(data);
  } catch (error) {
    console.error('GitHub API error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch GitHub data',
      message: error.message 
    });
  }
});

module.exports = router;
