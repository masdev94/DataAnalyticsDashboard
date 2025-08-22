
import { FaChartLine } from 'react-icons/fa';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { CryptocurrencySection } from './components/CryptocurrencySection';
import { GitHubSection } from './components/GitHubSection';
import { WeatherSection } from './components/WeatherSection';
import { ConnectionStatus } from '../../components/ConnectionStatus';

export function Dashboard() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)' 
    }}>
      <ConnectionStatus />
      
      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '1.25rem' 
      }}>
        <header style={{ 
          textAlign: 'center', 
          marginBottom: '2.5rem', 
          color: '#f8fafc' 
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '0.75rem',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            color: '#ffffff'
          }}>
            <FaChartLine style={{ marginRight: '0.75rem', color: '#60a5fa' }} />
            Data Analytics Dashboard
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: '0.95', 
            fontWeight: '400',
            color: '#cbd5e1'
          }}>
            Real-time insights from multiple data sources
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '2rem', 
          marginBottom: '2.5rem' 
        }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <ErrorBoundary>
              <CryptocurrencySection />
            </ErrorBoundary>
          </div>
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
            <ErrorBoundary>
              <GitHubSection />
            </ErrorBoundary>
            <ErrorBoundary>
              <WeatherSection />
            </ErrorBoundary>
          </div>
        </div>

        <footer style={{ 
          textAlign: 'center', 
          color: '#cbd5e1', 
          opacity: '0.9' 
        }}>
          <p style={{ fontSize: '1.125rem', color: '#f1f5f9' }}>
            Built with React, TypeScript, Vite, and TailwindCSS
          </p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#94a3b8' }}>
            Clean, modular, and scalable architecture
          </p>
        </footer>
      </div>
    </div>
  );
}
