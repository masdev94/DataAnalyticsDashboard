import { Card } from '../ui/Card';
import { StatsGrid } from '../ui/StatsGrid';
import { useCryptoSection } from '../../hooks/useSectionHooks';
import { 
  FaBitcoin, 
  FaExclamationTriangle, 
  FaSpinner, 
  FaChartLine, 
  FaArrowUp, 
  FaArrowDown,
  FaInfoCircle
} from 'react-icons/fa';

export function CryptocurrencySection() {
  const { data, loading, error, refresh, hasData } = useCryptoSection();

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
                value: data.marketOverview.totalMarketCap,
                className: 'bg-blue-50'
              },
              {
                label: 'Average Price',
                value: data.marketOverview.averagePrice,
                className: 'bg-green-50'
              },
              {
                label: 'Total Coins',
                value: data.marketOverview.totalCoins,
                className: 'bg-purple-50'
              },
              {
                label: 'Top Gainers',
                value: data.marketOverview.topGainersCount,
                className: 'bg-yellow-50'
              }
            ]}
            columns={4}
          />

          {/* Top Gainers and Losers */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* Top Gainers */}
            <div className="top-gainers" style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              border: '1px solid #bbf7d0'
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
              <div className="space-y-4">
                {data.topGainers.map((coin, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1fae5'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>
                        {coin.name} ({coin.symbol})
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {coin.price}
                      </div>
                    </div>
                    <div style={{ 
                      color: '#059669', 
                      fontWeight: '600',
                      fontSize: '1.125rem'
                    }}>
                      +{coin.changeFormatted.text}
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
              border: '1px solid #fecaca'
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
              <div className="space-y-4">
                {data.topLosers.map((coin, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: '1px solid #fee2e2'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>
                        {coin.name} ({coin.symbol})
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {coin.price}
                      </div>
                    </div>
                    <div style={{ 
                      color: '#dc2626', 
                      fontWeight: '600',
                      fontSize: '1.125rem'
                    }}>
                      {coin.changeFormatted.text}
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
              <FaChartLine />
              Top Coins by Market Cap
            </h3>
            <div className="space-y-4">
              {data.topByMarketCap.map((coin, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0'
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
                      {coin.rank}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>
                        {coin.name} ({coin.symbol})
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {coin.price}
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    color: '#1e293b', 
                    fontWeight: '600',
                    fontSize: '1.125rem'
                  }}>
                    {coin.marketCap}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
            Data provided by CoinGecko API • Total coins: {data.marketOverview.totalCoins}
          </div>
        </div>
      )}
    </Card>
  );
}
