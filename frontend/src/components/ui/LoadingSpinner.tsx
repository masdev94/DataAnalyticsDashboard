import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'medium', text, className = '' }: LoadingSpinnerProps) {
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      gap: '1rem'
    }} className={className}>
      <FaSpinner 
        className="fa-spin" 
        style={{ 
          fontSize: sizeMap[size],
          color: '#3b82f6'
        }} 
      />
      {text && (
        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          margin: 0,
          textAlign: 'center'
        }}>
          {text}
        </p>
      )}
    </div>
  );
}

// Skeleton loading component for better UX
export function SkeletonLoader({ 
  lines = 3, 
  height = '1rem', 
  width = '100%',
  className = '' 
}: {
  lines?: number;
  height?: string;
  width?: string;
  className?: string;
}) {
  return (
    <div style={{ width }} className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          style={{
            height,
            backgroundColor: '#e5e7eb',
            borderRadius: '0.25rem',
            marginBottom: index < lines - 1 ? '0.75rem' : 0,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      ))}
    </div>
  );
}

// Card skeleton for dashboard sections
export function CardSkeleton({ 
  title = true, 
  stats = 4, 
  content = true,
  className = '' 
}: {
  title?: boolean;
  stats?: number;
  content?: boolean;
  className?: string;
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }} className={className}>
      {title && (
        <div style={{ marginBottom: '1.5rem' }}>
          <SkeletonLoader lines={1} height="1.5rem" width="60%" />
        </div>
      )}
      
      {stats > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${Math.min(stats, 4)}, 1fr)`,
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {Array.from({ length: stats }).map((_, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <SkeletonLoader lines={2} height="1rem" />
            </div>
          ))}
        </div>
      )}
      
      {content && (
        <div>
          <SkeletonLoader lines={3} height="1rem" />
        </div>
      )}
    </div>
  );
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
  
  .fa-spin {
    animation: fa-spin 1s infinite linear;
  }
  
  @keyframes fa-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(style);
