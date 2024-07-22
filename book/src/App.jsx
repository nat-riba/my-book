import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect} from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { UsuarioContext } from "./contexts/UsuarioContext";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import Ajuda from "./components/ajuda/Ajuda";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import AddBook from "./pages/addbook/AddBook";
import NotFound from "./pages/notfound/NotFound";
import Loader from "./components/loader/Loader";



function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // user null = usuário deslogou
      // user not null = usuário logado
      setUsuarioLogado(user);
      setLoading(false);
    });

  }, []);

  if(loading) {
    return (
      <Loader />
    ); // Esse elemento será exibido enquanto a aplicação é carregada e ser for null, não será exibido nada e tbm pode ser uma imagem ou logo
  }

  return(
    <>
      <UsuarioContext.Provider value={usuarioLogado}>
      
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
      </UsuarioContext.Provider>
    </>
  );
}

export default App;
