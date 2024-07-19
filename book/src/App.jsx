import './App.css'
import React from 'react';
import Ajuda from './components/ajuda/Ajuda';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";


function App() {
  return(
    <>
        <div className="app">
          <Ajuda/>
        </div>
      <BrowserRouter>
        {/* <Menu /> */}
        <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />

        </Routes>
        {/* <Rodape /> */}
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;