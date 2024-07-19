import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png"

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">Book Catalog</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/catalog">Catalog</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cadastro">Cadastro</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/ajuda">Ajuda</Link>
            </li>
            </ul>
        </div>
        </div>
        <img src={logo} alt="Logo" style={{ borderRadius: '50%',  width: '150px', height: '150px' }} />
    </nav>
  );
}

export default Menu;
