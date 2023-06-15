import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@sendbird/uikit-react/dist/index.css';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
