import { Card } from '../ui/Card';
import { StatsGrid } from '../ui/StatsGrid';
import { useGitHubData } from '../../hooks/useDashboardData';
import { formatNumber } from '../../utils/formatters';
import type { GitHubRepository } from '../../types';

export function GitHubSection() {
  const { data, loading, error, refresh } = useGitHubData();

  if (error) {
    return (
      <Card title="GitHub Trends" icon="fab fa-github" onRefresh={refresh}>
        <div className="error">Error: {error}</div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card title="GitHub Trends" icon="fab fa-github" onRefresh={refresh}>
        <div className="loading">Loading GitHub data...</div>
      </Card>
    );
  }

  const statsItems = [
    { label: 'Total Repos', value: data.totalRepos },
    { label: 'Total Stars', value: formatNumber(data.totalStars) },
    { label: 'Total Forks', value: formatNumber(data.totalForks) },
    { label: 'Avg Stars', value: formatNumber(data.averageStars) },
  ];

  const sortedLanguages = Object.entries(data.topLanguages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const renderRepository = (repo: GitHubRepository) => (
    <div key={repo.id} className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="font-semibold mb-2 text-gray-800">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-primary-600 transition-colors"
        >
          {repo.full_name}
        </a>
      </div>
      <div className="text-sm text-gray-600 flex gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          <i className="fas fa-star text-yellow-500"></i>
          <span>{formatNumber(repo.stargazers_count)}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fas fa-code-branch text-blue-500"></i>
          <span>{formatNumber(repo.forks_count)}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fas fa-code text-green-500"></i>
          <span>{repo.language || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fas fa-eye text-purple-500"></i>
          <span>{formatNumber(repo.watchers_count)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card 
      title="GitHub Trends" 
      icon="fab fa-github" 
      onRefresh={refresh}
      loading={loading}
    >
      <StatsGrid items={statsItems} columns={4} />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Top Programming Languages</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {sortedLanguages.map(([language, count]) => (
              <div key={language} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="font-medium text-gray-700">{language}</span>
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Trending Repositories</h3>
          <div className="bg-gray-50 rounded-lg p-4 min-h-[300px]">
            {data.topRepos.map(renderRepository)}
          </div>
        </div>
      </div>
    </Card>
  );
}
