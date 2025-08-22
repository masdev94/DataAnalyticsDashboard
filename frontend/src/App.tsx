import { DashboardProvider } from './context/DashboardContext';
import { Dashboard } from './components/pages';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

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
