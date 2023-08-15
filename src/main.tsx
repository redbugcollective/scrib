import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initWebAssembly, KeyPair } from 'shirokuma'

await initWebAssembly()

const keyPair = new KeyPair()
console.log(keyPair.publicKey())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
