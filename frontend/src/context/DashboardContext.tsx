import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { DashboardState, LoadingState, ErrorState, CryptoData, GitHubData, WeatherData } from '../types/index';

// Action Types
type DashboardAction =
  | { type: 'SET_CRYPTO_DATA'; payload: CryptoData }
  | { type: 'SET_GITHUB_DATA'; payload: GitHubData }
  | { type: 'SET_WEATHER_DATA'; payload: WeatherData }
  | { type: 'SET_LOADING'; payload: Partial<LoadingState> }
  | { type: 'SET_ERROR'; payload: Partial<ErrorState> }
  | { type: 'CLEAR_ERROR'; payload: keyof ErrorState }
  | { type: 'RESET_STATE' };

// Initial State
const initialState: DashboardState = {
  crypto: null,
  github: null,
  weather: null,
  loading: {
    crypto: false,
    github: false,
    weather: false,
  },
  errors: {
    crypto: null,
    github: null,
    weather: null,
  },
};

// Reducer
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_CRYPTO_DATA':
      return {
        ...state,
        crypto: action.payload,
        loading: { ...state.loading, crypto: false },
        errors: { ...state.errors, crypto: null },
      };
    
    case 'SET_GITHUB_DATA':
      return {
        ...state,
        github: action.payload,
        loading: { ...state.loading, github: false },
        errors: { ...state.errors, github: null },
      };
    
    case 'SET_WEATHER_DATA':
      return {
        ...state,
        weather: action.payload,
        loading: { ...state.loading, weather: false },
        errors: { ...state.errors, weather: null },
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
        loading: {
          ...state.loading,
          ...Object.keys(action.payload).reduce((acc, key) => ({
            ...acc,
            [key]: false,
          }), {}),
        },
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.payload]: null },
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Context
interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider Component
interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom Hook
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
