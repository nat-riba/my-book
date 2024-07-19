import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import Ajuda from "./components/ajuda/Ajuda";



function App() {
  return(
    <>
       <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
