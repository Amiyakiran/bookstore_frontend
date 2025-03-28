import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Contextshare from './context/Contextshare.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='939781655356-v78qrgs79npo5ul6chtb7j0368r5meht.apps.googleusercontent.com'>
        <Contextshare>
          <App />
        </Contextshare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
