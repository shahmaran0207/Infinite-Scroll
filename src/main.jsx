import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App.jsx';
import './index.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const root=React.createRoot(document.getElementById('root'));
const querryClient=new QueryClient();

root.render(
    <QueryClientProvider client={querryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
)
