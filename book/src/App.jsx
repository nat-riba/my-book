import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import Menu from "./components/menu/Menu";
import Ajuda from "./components/ajuda/Ajuda";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";



function App() {
  return(
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Rodape /> */}

      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
