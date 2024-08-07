import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import {Provider} from 'react-redux';
import store from './redux/store.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </BrowserRouter>
 </AuthProvider>,
)
