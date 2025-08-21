import { Card } from '../ui/Card';
import { StatsGrid } from '../ui/StatsGrid';
import { useCryptoData } from '../../hooks/useDashboardData';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import type { Cryptocurrency } from '../../types/index';

export function CryptocurrencySection() {
  const { data, loading, error, refresh } = useCryptoData();

  if (error) {
    return (
      <Card title="Cryptocurrency Market" icon="fab fa-bitcoin" onRefresh={refresh}>
        <div className="error">Error: {error}</div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card title="Cryptocurrency Market" icon="fab fa-bitcoin" onRefresh={refresh}>
        <div className="loading">Loading cryptocurrency data...</div>
      </Card>
    );
  }

  const statsItems = [
    { label: 'Total Market Cap', value: formatCurrency(data.totalMarketCap) },
    { label: 'Average Price', value: formatCurrency(data.averagePrice) },
  ];

  const renderCoinList = (coins: Cryptocurrency[], title: string, className: string) => (
    <div className={className}>
      <h3 className={`text-lg font-medium mb-4 ${className.includes('gainers') ? 'text-green-600' : 'text-red-600'}`}>
        {title}
      </h3>
      <div className="bg-gray-50 rounded-lg p-4 min-h-[120px]">
        {coins.map((coin) => {
          const percentage = formatPercentage(coin.price_change_percentage_24h);
          return (
            <div key={coin.id} className="py-2 border-b border-gray-200 last:border-b-0">
              <strong className="text-gray-800">{coin.symbol.toUpperCase()}</strong>:{' '}
              <span style={{ color: percentage.color }}>{percentage.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card 
      title="Cryptocurrency Market" 
      icon="fab fa-bitcoin" 
      onRefresh={refresh}
      loading={loading}
    >
      <StatsGrid items={statsItems} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {renderCoinList(data.topGainers, 'Top Gainers (24h)', 'top-gainers')}
        {renderCoinList(data.topLosers, 'Top Losers (24h)', 'top-losers')}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">All Coins</h3>
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Coin</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Price</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">24h Change</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {data.coins.map((coin) => {
                const percentage = formatPercentage(coin.price_change_percentage_24h);
                return (
                  <tr key={coin.id} className="border-b border-gray-100 hover:bg-gray-100 transition-colors">
                    <td className="py-3 px-2">
                      <strong className="text-gray-800">{coin.name}</strong>
                      <br />
                      <small className="text-gray-500">{coin.symbol.toUpperCase()}</small>
                    </td>
                    <td className="py-3 px-2">{formatCurrency(coin.current_price)}</td>
                    <td className="py-3 px-2" style={{ color: percentage.color }}>{percentage.text}</td>
                    <td className="py-3 px-2">{formatCurrency(coin.market_cap)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
