import { DashboardProvider } from './context/DashboardContext.js';
import { CryptocurrencySection } from './components/dashboard/CryptocurrencySection.js';
import { GitHubSection } from './components/dashboard/GitHubSection.js';
import { WeatherSection } from './components/dashboard/WeatherSection.js';
import { FaChartLine } from 'react-icons/fa';

function App() {
  return (
    <DashboardProvider>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0284c7 0%, #c026d3 100%)' 
      }}>
        <div style={{ 
          maxWidth: '80rem', 
          margin: '0 auto', 
          padding: '1.25rem' 
        }}>
          <header style={{ 
            textAlign: 'center', 
            marginBottom: '2.5rem', 
            color: 'white' 
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: '700', 
              marginBottom: '0.75rem',
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <FaChartLine style={{ marginRight: '0.75rem' }} />
              Data Analytics Dashboard
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: '0.9', 
              fontWeight: '300' 
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
              <CryptocurrencySection />
            </div>
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
              <GitHubSection />
              <WeatherSection />
            </div>
          </div>

          <footer style={{ 
            textAlign: 'center', 
            color: 'white', 
            opacity: '0.8' 
          }}>
            <p style={{ fontSize: '1.125rem' }}>
              Built with React, TypeScript, Vite, and TailwindCSS
            </p>
          </footer>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;
