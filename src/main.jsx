import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContext from "./context/AuthContext.jsx"
import {Toaster} from "react-hot-toast"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>

    <App />
    <Toaster/>
    </AuthContext>
  </React.StrictMode>,
)
