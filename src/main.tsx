import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'
import './setup/console-filters'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
);
