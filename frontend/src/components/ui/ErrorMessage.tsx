import React from 'react';
import { FaExclamationTriangle, FaRedo, FaInfoCircle } from 'react-icons/fa';

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
  variant?: 'error' | 'warning' | 'info';
  showDetails?: boolean;
  className?: string;
}

export function ErrorMessage({ 
  error, 
  onRetry, 
  variant = 'error',
  showDetails = false,
  className = '' 
}: ErrorMessageProps) {
  const variantStyles = {
    error: {
      backgroundColor: '#fef2f2',
      borderColor: '#fecaca',
      iconColor: '#dc2626',
      textColor: '#991b1b'
    },
    warning: {
      backgroundColor: '#fffbeb',
      borderColor: '#fed7aa',
      iconColor: '#f59e0b',
      textColor: '#92400e'
    },
    info: {
      backgroundColor: '#eff6ff',
      borderColor: '#bfdbfe',
      iconColor: '#3b82f6',
      textColor: '#1e40af'
    }
  };

  const styles = variantStyles[variant];
  const Icon = variant === 'error' ? FaExclamationTriangle : 
               variant === 'warning' ? FaExclamationTriangle : FaInfoCircle;

  return (
    <div style={{
      backgroundColor: styles.backgroundColor,
      border: `1px solid ${styles.borderColor}`,
      borderRadius: '0.5rem',
      padding: '1rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem'
    }} className={className}>
      <Icon style={{
        color: styles.iconColor,
        fontSize: '1.25rem',
        marginTop: '0.125rem',
        flexShrink: 0
      }} />
      
      <div style={{ flex: 1 }}>
        <p style={{
          margin: 0,
          color: styles.textColor,
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          {error}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: styles.iconColor,
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <FaRedo style={{ marginRight: '0.5rem' }} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

// Empty state component for when no data is found
export function EmptyState({ 
  title, 
  message, 
  icon, 
  action,
  className = '' 
}: {
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem',
      textAlign: 'center',
      backgroundColor: '#f9fafb',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb'
    }} className={className}>
      {icon && (
        <div style={{
          fontSize: '3rem',
          color: '#9ca3af',
          marginBottom: '1rem'
        }}>
          {icon}
        </div>
      )}
      
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 0.5rem 0'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: '1rem',
        color: '#6b7280',
        margin: '0 0 1.5rem 0',
        maxWidth: '400px'
      }}>
        {message}
      </p>
      
      {action && action}
    </div>
  );
}

// No data found component
export function NoDataFound({ 
  message = 'No data available',
  onRefresh,
  className = '' 
}: {
  message?: string;
  onRefresh?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No Data Found"
      message={message}
      icon={<FaInfoCircle />}
      action={onRefresh && (
        <button
          onClick={onRefresh}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          <FaRedo style={{ marginRight: '0.5rem' }} />
          Refresh
        </button>
      )}
      className={className}
    />
  );
}
