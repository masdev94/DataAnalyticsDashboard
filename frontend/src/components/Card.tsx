import type { ReactNode } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

interface CardProps {
  title: string;
  icon?: string | ReactNode;
  children: ReactNode;
  className?: string;
  onRefresh?: () => void;
  loading?: boolean;
  showRefresh?: boolean;
}

export function Card({ title, icon, children, className = '', onRefresh, loading, showRefresh = true }: CardProps) {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <i className={icon}></i>;
    }
    return icon;
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {icon && renderIcon()}
          {title}
        </h2>
        {onRefresh && showRefresh && (
          <button 
            className="btn-primary"
            onClick={onRefresh}
            disabled={loading}
          >
            <FaSyncAlt className={loading ? 'fa-spin' : ''} />
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
