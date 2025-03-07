import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { CommandMenu } from './CommandMenu.jsx'



createRoot(document.getElementById('search-root')).render(
  <StrictMode>
      <CommandMenu />
  </StrictMode>,
)
