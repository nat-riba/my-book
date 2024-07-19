<<<<<<< HEAD
import './App.css'
import React from 'react';
import Ajuda from './components/ajuda/Ajuda';
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";


>>>>>>> f545760c3d8fb42330ef20cbd4b75a8c44f02117

function App() {
  return(
    <>
<<<<<<< HEAD
        <div className="app">
          <Ajuda/>
        </div>
=======
      <BrowserRouter>
        {/* <Menu /> */}
        <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />

        </Routes>
        {/* <Rodape /> */}
      </BrowserRouter>
      <Toaster position="bottom-right" />
>>>>>>> f545760c3d8fb42330ef20cbd4b75a8c44f02117
    </>
  );
}

<<<<<<< HEAD
export default App

//Alana
=======
export default App;
>>>>>>> f545760c3d8fb42330ef20cbd4b75a8c44f02117
