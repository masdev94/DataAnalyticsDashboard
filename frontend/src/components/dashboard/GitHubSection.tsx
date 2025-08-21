import { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { StatsGrid } from '../ui/StatsGrid';
import { useGitHubSection } from '../../hooks/useSectionHooks';
import { 
  FaGithub, 
  FaList, 
  FaChartBar, 
  FaStar, 
  FaCodeBranch, 
  FaEye, 
  FaChartPie, 
  FaChevronLeft, 
  FaChevronRight,
  FaExclamationTriangle,
  FaSpinner,
  FaInfoCircle
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ITEMS_PER_PAGE = 5;

export function GitHubSection() {
  const { data, loading, error, refresh, hasData } = useGitHubSection();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'repos' | 'charts'>('repos');

  const totalPages = useMemo(() => {
    if (!data?.repositories) return 0;
    return Math.ceil(data.repositories.length / ITEMS_PER_PAGE);
  }, [data?.repositories]);

  const paginatedRepos = useMemo(() => {
    if (!data?.repositories) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.repositories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [data?.repositories, currentPage]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

  if (error) {
    return (
      <Card title="GitHub Trending Repositories" icon={<FaGithub />}>
        <div className="error">
          <FaExclamationTriangle style={{ marginRight: '0.5rem' }} />
          Error: {error}
        </div>
      </Card>
    );
  }

  return (
    <Card title="GitHub Trending Repositories" icon={<FaGithub />} onRefresh={refresh} loading={loading}>
      {loading && (
        <div className="loading">
          <FaSpinner className="fa-spin" style={{ marginRight: '0.5rem' }} />
          Loading GitHub trending data...
        </div>
      )}

      {hasData && data && (
        <div>
          {/* Overview Stats */}
          <StatsGrid 
            items={[
              {
                label: 'Total Repositories',
                value: data.overview.totalRepos,
                className: 'bg-blue-50'
              },
              {
                label: 'Total Stars',
                value: data.overview.totalStars,
                className: 'bg-yellow-50'
              },
              {
                label: 'Total Forks',
                value: data.overview.totalForks,
                className: 'bg-green-50'
              },
              {
                label: 'Average Stars',
                value: data.overview.averageStars,
                className: 'bg-purple-50'
              }
            ]}
            columns={4}
          />

          {/* Tab Navigation */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '1.5rem',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <button
              onClick={() => setActiveTab('repos')}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                backgroundColor: activeTab === 'repos' ? '#3b82f6' : 'transparent',
                color: activeTab === 'repos' ? 'white' : '#6b7280',
                borderRadius: '0.5rem 0.5rem 0 0',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FaList style={{ marginRight: '0.5rem' }} />
              Repositories
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                backgroundColor: activeTab === 'charts' ? '#3b82f6' : 'transparent',
                color: activeTab === 'charts' ? 'white' : '#6b7280',
                borderRadius: '0.5rem 0.5rem 0 0',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FaChartBar style={{ marginRight: '0.5rem' }} />
              Charts & Analytics
            </button>
          </div>

          {activeTab === 'repos' && (
            <>
              {/* Top Repositories with Pagination */}
              <div style={{ 
                backgroundColor: '#f8fafc', 
                padding: '1.5rem', 
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
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
                  <FaStar style={{ color: '#f59e0b' }} />
                  Top Trending Repositories
                </h3>
                <div className="space-y-4">
                  {paginatedRepos.map((repo, index) => (
                    <div key={repo.id} style={{ 
                      backgroundColor: 'white',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ 
                          width: '2rem', 
                          height: '2rem', 
                          backgroundColor: '#3b82f6', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '0.875rem'
                        }}>
                          {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            marginBottom: '0.25rem'
                          }}>
                            <a 
                              href={repo.html_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ 
                                fontWeight: '600', 
                                color: '#1f2937',
                                textDecoration: 'none'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#1f2937'}
                            >
                              {repo.full_name}
                            </a>
                            {repo.language && (
                              <span style={{ 
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: '#e0e7ff',
                                color: '#3730a3',
                                borderRadius: '0.25rem',
                                fontWeight: '500'
                              }}>
                                {repo.language}
                              </span>
                            )}
                          </div>
                          {repo.description && (
                            <p style={{ 
                              fontSize: '0.875rem', 
                              color: '#6b7280',
                              marginBottom: '0.5rem',
                              lineHeight: '1.4'
                            }}>
                              {repo.description.length > 100 
                                ? `${repo.description.substring(0, 100)}...` 
                                : repo.description
                              }
                            </p>
                          )}
                          <div style={{ 
                            display: 'flex', 
                            gap: '1rem', 
                            fontSize: '0.875rem',
                            color: '#6b7280'
                          }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <FaStar style={{ color: '#f59e0b' }} />
                              {repo.stargazers_count}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <FaCodeBranch style={{ color: '#10b981' }} />
                              {repo.forks_count}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <FaEye style={{ color: '#3b82f6' }} />
                              {repo.watchers_count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                        borderRadius: '0.375rem',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <FaChevronLeft /> Previous
                    </button>
                    
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.25rem',
                      alignItems: 'center'
                    }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            backgroundColor: currentPage === page ? '#3b82f6' : 'white',
                            color: currentPage === page ? 'white' : '#374151',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            minWidth: '2.5rem'
                          }}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                        borderRadius: '0.375rem',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      Next <FaChevronRight />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'charts' && (
            <>
              {/* Programming Languages Chart */}
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
                  <FaChartPie style={{ color: '#8b5cf6' }} />
                  Programming Languages Distribution
                </h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.chartData.languages}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ language, percentage }) => `${language} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {data.chartData.languages.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, 'Repositories']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stars and Forks Comparison Chart */}
              <div style={{ 
                backgroundColor: '#f8fafc', 
                padding: '1.5rem', 
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
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
                  <FaChartBar style={{ color: '#f59e0b' }} />
                  Top Repositories: Stars vs Forks
                </h3>
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.chartData.starsVsForks}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [value, name === 'stars' ? 'Stars' : 'Forks']} />
                      <Bar dataKey="stars" fill="#f59e0b" name="Stars" />
                      <Bar dataKey="forks" fill="#10b981" name="Forks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* API Info Footer */}
          <div style={{ 
            textAlign: 'center', 
            padding: '0.75rem', 
            backgroundColor: '#f0fdf4', 
            borderRadius: '0.5rem',
            border: '1px solid #bbf7d0',
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#166534'
          }}>
            <FaInfoCircle style={{ marginRight: '0.5rem' }} />
            Data provided by GitHub API • Trending repositories from 2024 • Total repos: {data.totalRepos}
          </div>
        </div>
      )}
    </Card>
  );
}
