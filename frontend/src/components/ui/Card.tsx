import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  onRefresh?: () => void;
  loading?: boolean;
}

export function Card({ title, icon, children, className = '', onRefresh, loading }: CardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {icon && <i className={icon}></i>}
          {title}
        </h2>
        {onRefresh && (
          <button 
            className="btn-primary"
            onClick={onRefresh}
            disabled={loading}
          >
            <i className="fas fa-sync-alt"></i>
            {loading ? ' Loading...' : ' Refresh'}
          </button>
        )}
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
