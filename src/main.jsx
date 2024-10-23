import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM for rendering
import App from '/src/App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new Query Client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </QueryClientProvider>
);
