import { useContext, useEffect, useState } from "react";
import { getBooksByUser, deleteBook } from "../../firebase/bookService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card, Container, Badge, Button } from "react-bootstrap";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import "./Catalog.css";

function Catalog() {
    const [books, setBooks] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const usuario = useContext(UsuarioContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            carregarDados();
        }
    }, [usuario]);

    function carregarDados() {
        setLoading(true);
        getBooksByUser(usuario.uid)
            .then((resultados) => {
                console.log("Books fetched: ", resultados);
                setBooks(resultados);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching books: ", error);
                toast.error("Erro ao carregar livros");
                setLoading(false);
            });
    }

    function delBook(id) {
        const deletar = confirm("Tem certeza?");
        if (deletar) {
            deleteBook(id)
                .then(() => {
                    toast.success("Livro removido com sucesso!");
                    carregarDados();
                })
                .catch((error) => {
                    console.error("Error deleting book: ", error);
                    toast.error("Erro ao remover o livro");
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

    if (usuario === null) {
        return <Navigate to="/login" />;
    }

    const genero = {
        "Romance": "primary",
        "Fantasia": "warning",
        "Ficção": "success",
        "Religioso": "info",
        "outros": "danger",
    };

    const livrosFiltrados = books.filter(book =>
        book.title.toLowerCase().includes(filtroTitulo.toLowerCase())
    );

    return (
        <main>
            <h1 className="text-center">Seu catálogo de livros!</h1>
            <h2>Sua biblioteca, suas regras:</h2>
            <p><strong>Solicite aqui novos títulos:</strong></p>
            <Link to="/catalog/add" className="btn-1 my-1">Solicite seu livro</Link>
            <input
                type="text"
                value={filtroTitulo}
                onChange={e => setFiltroTitulo(e.target.value)}
                placeholder="Seu catálogo: Filtrar por título..."
                className="form-control my-3"
            />
            <hr />
            {loading ? (
                <Loader />
            ) : (
                <Container className="mt-5">
                    {livrosFiltrados.length > 0 ? (
                        livrosFiltrados.map(book => (
                            <section key={book.id} className="my-2 p-1">
                                <Card className="my-2 p-3">
                                    <Card.Title className="Card-Title">{book.title}</Card.Title>
                                    <Card.Text>
                                        <p><strong>Autor:</strong> {book.author}</p>
                                        <p><strong>Gênero:</strong> {book.genre}</p>
                                        <p><strong>Ano:</strong> {book.year}</p>
                                    </Card.Text>
                                    <div>
                                        {book.concluido ? (
                                            <Badge bg="success" className="m-1">Concluído</Badge>
                                        ) : (
                                            <Badge bg="warning" className="m-1">Pendente</Badge>
                                        )}
                                        <Badge bg={genero[book.genre] || "secondary"} className="m-1">{book.genre}</Badge>
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
                        ))
                    ) : (
                        <p className="text-center">Nenhum livro encontrado.</p>
                    )}
                </Container>
            )}
        </main>
    );
}

export default Catalog;
