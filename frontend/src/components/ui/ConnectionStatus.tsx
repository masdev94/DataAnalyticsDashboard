import { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';

interface ConnectionStatusProps {
  onRetry?: () => void;
}

export function ConnectionStatus({ onRetry }: ConnectionStatusProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOffline) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 1000,
      backgroundColor: isOnline ? '#10b981' : '#ef4444',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {isOnline ? (
        <>
          <FaWifi />
          Back Online
        </>
      ) : (
        <>
          <FaWifi />
          No Internet Connection
        </>
      )}
      
      {!isOnline && onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginLeft: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '0.25rem',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
