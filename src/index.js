import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProvider } from "./contexts/AuthContext";
import { SmilesProvider } from './contexts/SmilesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SmilesProvider>
        <App />
      </SmilesProvider>
    </AuthProvider>
  </React.StrictMode>
);
