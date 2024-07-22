import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { logout } from "../../firebase/auth";
import { Button } from "react-bootstrap";


import "./Menu.css";

function Menu() {
  const usuario = useContext(UsuarioContext); // Usuario para poder fazer a dinâmica
  const navigate = useNavigate();

  // Para o botão de logout
  function handleLogout() {
    logout().then(() => {
        navigate("/login");
    })
}


  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {usuario && <Link className="nav-link" to="/catalog">
                Catalogo
              </Link>}
            </li>
            <li className="nav-item">
              {!usuario && <Link className="nav-link" to="/cadastro">
                Cadastro
              </Link>}
            </li>
            <li className="nav-item">
              {!usuario && <Link className="nav-link" to="/login">
                Login
              </Link>}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ajuda">
                Ajuda
              </Link>
            </li>
            {usuario && <span className="text-light nav-link">{usuario.displayName}</span>}
            {usuario && <Button variant="outline-light" onClick={handleLogout}>
              Sair
            </Button>}       
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
