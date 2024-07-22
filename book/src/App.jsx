import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, {useState} from "react";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import Ajuda from "./components/ajuda/Ajuda";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import Ajuda from "./components/ajuda/Ajuda";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";



function App() {
  return(
    <>
      <BrowserRouter>
       <div className="content">
       <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/add" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
       </div>
        <Footer />
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
