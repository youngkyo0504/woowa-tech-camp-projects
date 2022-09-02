import { SERVER_URL } from '@constants/env';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from '@components/common/CommonToast/ToastContext';
import App from './App';

axios.defaults.baseURL = SERVER_URL;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <ToastProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </ToastProvider>,
);
