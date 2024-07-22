import Catalogo from "../catalog/Catalog.jsx";
import "./Home.css";
import {Button} from "react-bootstrap";

function Home() {
    return(
        <main>
            <h1>Seja Bem vindo a nossa livraria !!</h1>
            <h2>Aqui você encontra os melhores livros, dos melhores autores, tudo em um só lugar!</h2>
            <p>Veja nosso catálogo de livros</p>
            <Button>Catálogo</Button>
        </main>
    );
}

export default Home;