import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './global.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import { styleSetup, popup } from "./utilities/Alert.js"

// add alert lib style
styleSetup()

createRoot(document.getElementById('root')).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
)
