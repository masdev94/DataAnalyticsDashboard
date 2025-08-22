class GitHubDataProcessor {
  processRepositoryData(repos) {
    return {
      totalRepos: repos.length,
      totalStars: this.calculateTotalStars(repos),
      totalForks: this.calculateTotalForks(repos),
      topLanguages: this.categorizeByLanguage(repos),
      topRepos: repos.slice(0, 10),
      averageStars: this.calculateAverageStars(repos)
    };
  }

  calculateTotalStars(repos) {
    return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  }

  calculateTotalForks(repos) {
    return repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  }

  calculateAverageStars(repos) {
    return Math.round(this.calculateTotalStars(repos) / repos.length);
  }

  categorizeByLanguage(repos) {
    const languages = {};
    repos.forEach(repo => {
      const language = repo.language || 'Unknown';
      languages[language] = (languages[language] || 0) + 1;
    });
    return languages;
  }
}

module.exports = { GitHubDataProcessor };
