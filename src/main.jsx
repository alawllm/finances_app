import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { CategoriesProvider} from './contexts/categories.context.jsx'
import { UserProvider } from './contexts/user.context.jsx'
import App from './App.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
      <App />
      </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)