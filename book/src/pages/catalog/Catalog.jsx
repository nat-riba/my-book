import { useContext, useEffect, useState } from "react";
import { getBooksByUser } from "../../firebase/bookService"; // Importa a função getBooks que busca os livros
import "./Catalog.css"; 
import { Link, Navigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { useNavigate } from "react-router-dom";


const Catalog = () => {
    const [books, setBooks] = useState([]); // Estado para armazenar os livros

    const usuario = useContext(UsuarioContext); // Recuperamos a info do usuário (logado = tem algo ou não logado = não tem)
    const navigate = useNavigate();
    // Função para carregar os livros quando o componente é montado
    function carregarDados() {
        if(usuario) {
            getBooksByUser(usuario.uid).then((resultados) => {
                setBooks(resultados);
            });
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

     // Se o usuário não está logado
     if(usuario === null) {
        // Navegar para login
        return <Navigate to="/login" />
    }

    return (
        <main>    
            <h1 className="text-center">Seu catálogo de livros!</h1> 
            <h2>Sua biblioteca, suas regras:</h2>
            <p><strong>Solicite aqui novos títulos:</strong></p>
            <Link className="btn btn-outline-dark my-1 w-80 shadow-lg" to="/catalog/add">Solicite seu livro</Link>
            <hr />     
            <div className="container">
                <Container className="mt-5">
                    <div className="Card">
                        {books.map(book => (
                            <section key={book.id} className="my-2 p-1">
                                <Card className="my-2 p-3">
                                    <Card.Title className="Card-Title">{book.titulo}</Card.Title>
                                    <Card.Text>
                                        <p><strong>Autor:</strong> {book.autor}</p>
                                        <p><strong>Gênero:</strong> {book.genero}</p>
                                        <p><strong>Ano:</strong> {book.ano}</p>
                                    </Card.Text>
                                </Card>
                            </section>
                        ))}
                    </div>
                </Container>
            </div>  
        </main>
    );
};

export default Catalog;


