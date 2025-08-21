import { useCryptoSection } from '../../hooks/useDashboardData';
import { Card } from '../ui/Card';
import { StatsGrid } from '../ui/StatsGrid';
import { formatCurrency } from '../../utils/formatters';
import { 
  FaBitcoin, 
  FaExclamationTriangle, 
  FaSpinner, 
  FaChartLine, 
  FaArrowUp, 
  FaArrowDown,
  FaInfoCircle,
  FaCoins,
  FaDollarSign,
  FaGlobe,
  FaSyncAlt,
  FaEye,
  FaEyeSlash
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

export function CryptocurrencySection() {
  const { data, loading, error, refresh, hasData } = useCryptoSection();
  const [showCharts, setShowCharts] = useState(true);

  if (error) {
    return (
      <Card title="Cryptocurrency Market Data" icon={<FaBitcoin />}>
        <div className="error">
          <FaExclamationTriangle style={{ marginRight: '0.5rem' }} />
          Error: {error}
        </div>
      </Card>
    );
  }

  const marketCapData = data?.topByMarketCap?.slice(0, 10) || [];
  const priceChangeData = data?.topGainers?.concat(data?.topLosers || []).slice(0, 15) || [];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'];

  return (
    <Card title="Cryptocurrency Market Data" icon={<FaBitcoin />} onRefresh={refresh} loading={loading}>
      {loading && (
        <div className="loading">
          <FaSpinner style={{ marginRight: '0.5rem' }} />
          Loading cryptocurrency data...
        </div>
      )}

      {hasData && data && (
        <div>
          {/* Market Overview Stats */}
          <StatsGrid 
            items={[
              {
                label: 'Total Market Cap',
                value: formatCurrency(data.marketOverview.totalMarketCap),
                icon: <FaGlobe />,
                className: 'bg-blue-50',
                color: 'text-blue-700'
              },
              {
                label: 'Average Price',
                value: formatCurrency(data.marketOverview.averagePrice),
                icon: <FaDollarSign />,
                className: 'bg-green-50',
                color: 'text-green-700'
              },
              {
                label: 'Total Coins',
                value: data.marketOverview.totalCoins.toLocaleString(),
                icon: <FaCoins />,
                className: 'bg-purple-50',
                color: 'text-purple-700'
              },
              {
                label: 'Market Trend',
                value: data.marketOverview.averagePrice > 0 ? 'Bullish' : 'Bearish',
                icon: data.marketOverview.averagePrice > 0 ? <FaArrowUp /> : <FaArrowDown />,
                className: data.marketOverview.averagePrice > 0 ? 'bg-emerald-50' : 'bg-red-50',
                color: data.marketOverview.averagePrice > 0 ? 'text-emerald-700' : 'text-red-700'
              }
            ]}
            columns={4}
          />

          {/* Charts Toggle and Timeframe Controls */}
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
                {showCharts ? <FaEyeSlash /> : <FaEye />}
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

          {/* Charts Section */}
          {showCharts && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              {/* Market Cap Distribution Chart */}
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
                  Market Cap Distribution (Top 10)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketCapData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      // label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="market_cap"
                    >
                      {marketCapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Price Change Performance Chart */}
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
                  Price Change Performance (24h)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priceChangeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="symbol" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '24h Change']}
                      labelStyle={{ fontSize: '12px' }}
                    />
                    <Bar 
                      dataKey="price_change_percentage_24h" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Top Gainers and Losers */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* Top Gainers */}
            <div className="top-gainers" style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              border: '1px solid #bbf7d0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                color: '#059669', 
                fontSize: '1.25rem', 
                fontWeight: '600',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaArrowUp />
                Top Gainers (24h)
              </h3>
              <div className="space-y-3">
                {data.topGainers.map((coin, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1fae5',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '2.5rem', 
                        height: '2.5rem', 
                        backgroundColor: '#059669', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f293b', fontSize: '1rem' }}>
                          {coin.name} ({coin.symbol})
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {formatCurrency(coin.current_price)}
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      color: '#059669', 
                      fontWeight: '700',
                      fontSize: '1.125rem',
                      backgroundColor: '#dcfce7',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem'
                    }}>
                      +{coin.change.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="top-losers" style={{ 
              backgroundColor: '#fef2f2', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              border: '1px solid #fecaca',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                color: '#dc2626', 
                fontSize: '1.25rem', 
                fontWeight: '600',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaArrowDown />
                Top Losers (24h)
              </h3>
              <div className="space-y-3">
                {data.topLosers.map((coin, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: '1px solid #fee2e2',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '2.5rem', 
                        height: '2.5rem', 
                        backgroundColor: '#dc2626', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f293b', fontSize: '1rem' }}>
                          {coin.name} ({coin.symbol})
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {formatCurrency(coin.current_price)}
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      color: '#dc2626', 
                      fontWeight: '700',
                      fontSize: '1.125rem',
                      backgroundColor: '#fee2e2',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem'
                    }}>
                      {coin.change.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Coins by Market Cap */}
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
              <FaChartLine />
              Top Coins by Market Cap
            </h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {data.topByMarketCap.map((coin, index) => (
                <div key={index} style={{ 
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                      {coin.rank}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f293b', fontSize: '1rem' }}>
                        {coin.name} ({coin.symbol})
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {coin.priceFormatted}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      color: '#1f293b', 
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      {coin.marketCapFormatted}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: coin.change.text.startsWith('+') ? '#059669' : '#dc2626'
                    }}>
                      {coin.change.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends Summary */}
          <div style={{ 
            backgroundColor: '#f0f9ff', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            border: '1px solid #bae6fd',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ 
              color: '#0369a1', 
              fontSize: '1.25rem', 
              fontWeight: '600',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaArrowUp />
              Market Trends Summary
            </h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Bullish Coins
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
                  {data.topGainers.filter((coin: any) => coin.price_change_percentage_24h > 0).length}
                </div>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Bearish Coins
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>
                  {data.topLosers.filter((coin: any) => coin.price_change_percentage_24h < 0).length}
                </div>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Stable Coins
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6b7280' }}>
                  {data.topGainers.filter((coin: any) => Math.abs(coin.price_change_percentage_24h) < 1).length}
                </div>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Total Volume
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f293b' }}>
                  {formatCurrency(data.topGainers.reduce((sum: number, coin: any) => sum + (coin.total_volume || 0), 0))}
                </div>
              </div>
            </div>
          </div>

          {/* API Info Footer */}
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
            <FaInfoCircle />
            Data provided by CoinGecko API • Total coins: {data.marketOverview.totalCoins.toLocaleString()} • 
            Market cap: {formatCurrency(data.marketOverview.totalMarketCap)} • 
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      )}
    </Card>
  );
}