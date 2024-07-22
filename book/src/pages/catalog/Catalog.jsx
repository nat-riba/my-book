import { useContext, useEffect, useState } from "react";
import { getBooksByUser, deleteBook } from "../../firebase/bookService"; // Importa a função getBooks que busca os livros
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

    function deleteBook(id) {
        // True  = apagar tarefa or false = não fazer nada
        const deletar = confirm("Tem certeza?");
        if (deletar) {
            deleteTarefa(id).then(() => {
                toast.success("Livro removido com sucesso!");
                // Trazer a lista de livros atualizada
                carregarDados();
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

    const genero = {
        "Romance": "primary",
        "Fantasia": "warning",
        "Ficção": "success",
        "Religioso": "info" ,
        "outros": "danger",
    };

    return (
        <main>    
            <h1 className="text-center">Seu catálogo de livros!</h1> 
            <h2>Sua biblioteca, suas regras:</h2>
            <p><strong>Solicite aqui novos títulos:</strong></p>
            <Link className="btn btn-outline-dark my-1 w-80 shadow-lg" to="/catalog/add">Solicite seu livro</Link>
            <hr />   

            {livros ? 
            
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
                                    <div>
                                    {livro.concluido ? <Badge bg="success" className="m-1">Concluído</Badge> : <Badge bg="warning">Pendente</Badge>}
                                    <Badge bg={genero[livro.genero]} className="m-1">{livro.genero}</Badge>
                                </div>
                                <Button variant="outline-dark m-1" onClick={() => {
                                    navigate(`/C/editar/${tarefa.id}`);
                                }}>Editar</Button>
                                <Button variant="outline-danger m-1" onClick={() => deletarTarefa(tarefa.id)}>Excluir</Button>
                                </Card>
                            </section>
                        ))}
                    </div>
                </Container>
            </div>  : <Loader />}  
        </main>
    );
};

export default Catalog;


