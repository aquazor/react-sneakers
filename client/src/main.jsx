import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeContextProvider.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeContextProvider>
);
