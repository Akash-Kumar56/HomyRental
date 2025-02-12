import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Step 1
import { store } from './redux/store'; // Step 2 - Ensure the correct path to your store
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Step 3 */}
      <App />
    </Provider>
  </StrictMode>
);

