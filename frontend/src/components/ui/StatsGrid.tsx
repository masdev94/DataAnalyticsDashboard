interface StatItem {
  label: string;
  value: string | number;
  className?: string;
  icon?: React.ReactNode;
  color?: string;
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
        <div 
          key={index} 
          className={`stat-item ${item.className || ''}`}
          style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            marginBottom: '0.75rem'
          }}>
            {item.icon && (
              <div style={{ 
                fontSize: '1.5rem', 
                color: item.color || '#6b7280'
              }}>
                {item.icon}
              </div>
            )}
            <span 
              className="stat-label"
              style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280',
                fontWeight: '500'
              }}
            >
              {item.label}
            </span>
          </div>
          <span 
            className="stat-value"
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: item.color || '#1f2937',
              display: 'block'
            }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
