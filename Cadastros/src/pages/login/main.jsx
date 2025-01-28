import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Register from './login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Register />
  </StrictMode>,
)