import { DashboardProvider } from './context/DashboardContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <ErrorBoundary>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </ErrorBoundary>
  );
}

export default App;
