import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login.jsx'
import App from './App.jsx'
import {CookiesProvider} from 'react-cookie';


function Router(){
  return (
    <CookiesProvider>
    <BrowserRouter>
          <Routes>
            <Route exact path='/' element={< Login />} />
            <Route exact path='/articles' element={<App/>} />
          </Routes>
    </BrowserRouter>
    </CookiesProvider>
  )
}

export default Router