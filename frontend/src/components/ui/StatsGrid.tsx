interface StatItem {
  label: string;
  value: string | number;
  className?: string;
}

interface StatsGridProps {
  items: StatItem[];
  columns?: number;
  className?: string;
}

export function StatsGrid({ items, columns = 2, className = '' }: StatsGridProps) {
  return (
    <div 
      className={`stats-grid ${className}`}
      style={{ 
        display: 'grid',
        gap: '1.25rem',
        marginBottom: '1.5rem',
        gridTemplateColumns: `repeat(${columns}, 1fr)` 
      }}
    >
      {items.map((item, index) => (
        <div key={index} className={`stat-item ${item.className || ''}`}>
          <span className="stat-label">{item.label}</span>
          <span className="stat-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
