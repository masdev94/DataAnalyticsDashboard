import { useGitHubSection } from '../../hooks/useDashboardData';
import { Card } from '../ui/Card';
import { StatsGrid } from '../ui/StatsGrid';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage, NoDataFound } from '../ui/ErrorMessage';
import { formatNumber } from '../../utils/formatters';
import { 
  FaGithub, 
  FaStar, 
  FaCodeBranch, 
  FaEye,
  FaGlobe,
  FaCalendar,
  FaLanguage,
  FaSyncAlt,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function GitHubSection() {
  const { data, loading, error, refresh, hasData } = useGitHubSection();
  const [currentPage, setCurrentPage] = useState(1);
  const [showCharts, setShowCharts] = useState(true);

  if (loading) {
    return (
      <Card title="GitHub Trending Repositories" icon={<FaGithub />}>
        <LoadingSpinner 
          size="large" 
          text="Loading GitHub trending repositories..." 
        />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="GitHub Trending Repositories" icon={<FaGithub />}>
        <ErrorMessage 
          error={error} 
          onRetry={refresh}
          variant="error"
        />
      </Card>
    );
  }

  if (!hasData || !data) {
    return (
      <Card title="GitHub Trending Repositories" icon={<FaGithub />}>
        <NoDataFound 
          message="Unable to fetch GitHub trending repositories. This might be due to API rate limits or network issues."
          onRefresh={refresh}
        />
      </Card>
    );
  }

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.repositories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRepos = data.repositories.slice(startIndex, endIndex);

  console.log('GitHub Section Debug:', {
    totalRepos: data.repositories.length,
    totalPages,
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    paginatedReposLength: paginatedRepos.length
  });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return (
    <Card title="GitHub Trending Repositories" icon={<FaGithub />} onRefresh={refresh} loading={loading}>
      <StatsGrid 
        items={[
          {
            label: 'Total Repositories',
            value: data.overview.totalRepos.toLocaleString(),
            icon: <FaGithub />,
            className: 'bg-gray-50',
            color: 'text-gray-700'
          },
          {
            label: 'Total Stars',
            value: formatNumber(data.overview.totalStars),
            icon: <FaStar />,
            className: 'bg-yellow-50',
            color: 'text-yellow-700'
          },
          {
            label: 'Total Forks',
            value: formatNumber(data.overview.totalForks),
            icon: <FaCodeBranch />,
            className: 'bg-blue-50',
            color: 'text-blue-700'
          },
          {
            label: 'Average Stars',
            value: Math.round(data.overview.averageStars).toLocaleString(),
            icon: <FaStar />,
            className: 'bg-purple-50',
            color: 'text-purple-700'
          }
        ]}
        columns={4}
      />

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.75rem',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="btn-secondary"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem 1rem'
            }}
          >
            {showCharts ? <FaEye /> : <FaEye />}
            {showCharts ? 'Hide Charts' : 'Show Charts'}
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <FaSyncAlt />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {showCharts && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              color: '#1e293b', 
              fontSize: '1.125rem', 
              fontWeight: '600',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Top Programming Languages
            </h3>
            {data.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Repositories']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ 
                height: '300px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                No language data available
              </div>
            )}
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              color: '#1e293b', 
              fontSize: '1.125rem', 
              fontWeight: '600',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Stars vs Forks (Top 15)
            </h3>
            {data.starsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.starsData.slice(0, 15)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={10}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'Stars' ? 'Stars' : 'Forks']}
                    labelStyle={{ fontSize: '12px' }}
                  />
                  <Bar 
                    dataKey="stars" 
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    name="Stars"
                  />
                  <Bar 
                    dataKey="forks" 
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Forks"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ 
                height: '300px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                No repository data available
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '1.5rem', 
        borderRadius: '0.75rem',
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ 
          color: '#1e293b', 
          fontSize: '1.25rem', 
          fontWeight: '600',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaGithub />
          Trending Repositories
        </h3>

        {paginatedRepos.length > 0 ? (
          <div className="space-y-3">
            {paginatedRepos.map((repo, index) => (
              <div key={repo.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                  <div style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    backgroundColor: COLORS[index % COLORS.length], 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    {startIndex + index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '1rem' }}>
                      {repo.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      {repo.description || 'No description available'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                      {repo.language && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FaLanguage />
                          {repo.language}
                        </span>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FaCalendar />
                        {new Date(repo.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      color: '#f59e0b', 
                      fontWeight: '700',
                      fontSize: '1.125rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <FaStar />
                      {formatNumber(repo.stargazers_count)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Stars</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      color: '#3b82f6', 
                      fontWeight: '700',
                      fontSize: '1.125rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <FaCodeBranch />
                      {formatNumber(repo.forks_count)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Forks</div>
                  </div>
                  
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      borderRadius: '0.375rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                  >
                    <FaExternalLinkAlt />
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            No repositories available
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '2rem',
            padding: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                color: currentPage === 1 ? '#9ca3af' : '#374151',
                                 borderRadius: '1.5rem',
                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                 fontSize: '0.875rem',
                 fontWeight: '500',
                 transition: 'all 0.2s ease-in-out',
                 minWidth: '90px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '0.5rem',
                 border: currentPage === 1 ? '1px solid #e5e7eb' : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!loading && currentPage > 1) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && currentPage > 1) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              ← Previous
            </button>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              margin: '0 0.5rem'
            }}>
              <span style={{ 
                padding: '0.75rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                minWidth: '50px',
                textAlign: 'center'
              }}>
                {currentPage}
              </span>
              <span style={{ 
                margin: '0 0.75rem',
                color: '#6b7280',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                of {totalPages}
              </span>
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
                color: currentPage === totalPages ? '#9ca3af' : '#374151',
                                 borderRadius: '1.5rem',
                 cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                 fontSize: '0.875rem',
                 fontWeight: '500',
                 transition: 'all 0.2s ease-in-out',
                 minWidth: '90px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '0.5rem',
                 border: currentPage === totalPages ? '1px solid #e5e7eb' : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!loading && currentPage < totalPages) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && currentPage < totalPages) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '1rem', 
        backgroundColor: '#f0fdf4', 
        borderRadius: '0.75rem',
        border: '1px solid #bbf7d0',
        fontSize: '0.875rem',
        color: '#166534',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <FaGlobe />
        Data provided by GitHub API • Total repos: {data.overview.totalRepos.toLocaleString()} • 
        Total stars: {formatNumber(data.overview.totalStars)} • 
        Last updated: {new Date().toLocaleString()}
      </div>
    </Card>
  );
}
