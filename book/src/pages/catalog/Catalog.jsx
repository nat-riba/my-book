import { useContext, useEffect, useState } from "react";
import { getBooksByUser, deleteBook } from "../../firebase/bookService"; // Importa a função getBooks que busca os livros
import "./Catalog.css";
import { Link, Navigate } from "react-router-dom";
import { Card, Container, Badge, Button } from "react-bootstrap";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";



const Catalog = () => {
    const [books, setBooks] = useState([]); // Estado para armazenar os livros

    const [favoritos, setFavoritos] = useState([]);

    const usuario = useContext(UsuarioContext); // Recuperamos a info do usuário (logado = tem algo ou não logado = não tem)

    const navigate = useNavigate();
    // Função para carregar os livros quando o componente é montado
    function carregarDados() {
        if (usuario) {
            getBooksByUser(usuario.uid).then((resultados) => {
                setBooks(resultados);
            });
        }
    }

    function delBook(id) {
        // True  = apagar tarefa or false = não fazer nada
        const deletar = confirm("Tem certeza?");
        if (deletar) {
            deleteBook(id).then(() => {
                toast.success("Livro removido com sucesso!");
                // Trazer a lista de livros atualizada
                carregarDados();
            });
        }
    }

    function toggleFavorito(id) {
        setFavoritos(prevFavoritos => {
            if (prevFavoritos.includes(id)) {
                return prevFavoritos.filter(favId => favId !== id);
            } else {
                return [...prevFavoritos, id];
            }
        });
    }


    useEffect(() => {
        carregarDados();
    }, []);

    // Se o usuário não está logado
    if (usuario === null) {
        // Navegar para login
        return <Navigate to="/login" />
    }

    const genero = {
        "Romance": "primary",
        "Fantasia": "warning",
        "Ficção": "success",
        "Religioso": "info",
        "outros": "danger",
    };

    return (
        <main>
            <h1 className="text-center">Seu catálogo de livros!</h1>
            <h2>Sua biblioteca, suas regras:</h2>
            <p><strong>Solicite aqui novos títulos:</strong></p>
            <Link className="btn btn-outline-dark my-1 w-80 shadow-lg" to="/catalog/add">Solicite seu livro</Link>
            <hr />
            {books ? 
                <Container className="mt-5">
                    {books.map(book => (
                        <section key={book.id} className="my-2 p-1">
                            <Card className="my-2 p-3">
                                <Card.Title className="Card-Title">{book.titulo}</Card.Title>
                                <Card.Text>
                                    <p><strong>Autor:</strong> {book.autor}</p>
                                    <p><strong>Gênero:</strong> {book.genero}</p>
                                    <p><strong>Ano:</strong> {book.ano}</p>
                                </Card.Text>
                                <div>
                                    {book.concluido ? (
                                        <Badge bg="success" className="m-1">Concluído</Badge>
                                    ) : (
                                        <Badge bg="warning" className="m-1">Pendente</Badge>
                                    )}
                                    <Badge bg={genero[book.genero]} className="m-1">{book.genero}</Badge>
                                </div>
                                <Button
                                    variant="outline-dark m-1"
                                    onClick={() => navigate(`/catalog/edit/${book.id}`)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="outline-danger m-1"
                                    onClick={() => delBook(book.id)}
                                >
                                    Excluir
                                </Button>
                                <Button
                                    variant={favoritos.includes(book.id) ? "warning" : "outline-warning"}
                                    className="m-1"
                                    onClick={() => toggleFavorito(book.id)}
                                >
                                    {favoritos.includes(book.id) ? "Desfavoritar" : "Favoritar"}
                                </Button>
                            </Card>
                        </section>
                    ))}
                </Container>
                : <Loader />
            }

        </main>
    );
};

export default Catalog;


