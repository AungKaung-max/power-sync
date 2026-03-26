import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from "react-router-dom";
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    {/* <APIProvider apiKey={Envs.VITE_GOOGLE_MAPS_API_KEY}> */}
      <MemoryRouter>
        <App />
      </MemoryRouter>
    {/* </APIProvider> */}
  </StrictMode>,
)
