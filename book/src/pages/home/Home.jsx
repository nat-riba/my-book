import "./Home.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
    return(
        <main className="home">
            <h1>Bem vindo ao MyBook a sua livraria online</h1>
            <h2>Aqui você encontra os melhores livros, dos melhores autores, tudo em um só lugar!</h2>
            <p>Veja nosso catálogo de livros</p>
            <Link to="/Catalog" className='text-decoration-none'> 
            <Button  className="mt-2">Catálogo</Button></Link>                  
        </main>
    );
}

export default Home;