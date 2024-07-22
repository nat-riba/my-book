import { useEffect, useState } from 'react';
import { getBooks } from "../../firebase/bookService"; // Importa a função getBooks que busca os livros
import "./Catalog.css"; 
import { Link } from "react-router-dom";
import { Card, CardFooter, Container } from 'react-bootstrap';

const Catalog = () => {
    const [books, setBooks] = useState([]); // Estado para armazenar os livros

    // Função para carregar os livros quando o componente é montado
    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooks(); // Chama a função getBooks para buscar os livros
            console.log(fetchedBooks);
            setBooks(fetchedBooks); // Atualiza o estado com os livros buscados
        };

        fetchBooks(); // Executa a função para buscar os livros
    }, []); // O array vazio significa que isso só será executado uma vez, quando o componente for montado

    return (
        <main>    
            <h1 className="text-center">Seu catálogo de livros!</h1> 
            <hr />       
            <Container className="mt-5">
                {books.map(book => (
                    <section key={book.id} className="my-2 p-1">
                        <Card className="my-2 p-3">
                            <Card.Title>{book.titulo}</Card.Title>
                            <Card.Text>
                                <p><strong>Autor:</strong> {book.autor}</p>
                                <p><strong>Gênero:</strong> {book.genero}</p>
                                <p><strong>Ano:</strong> {book.ano}</p>
                            </Card.Text>
                        </Card>
                    </section>
                ))}
                <hr />
                <CardFooter className="mt-5">
                    <Card.Title>Sua biblioteca, suas regras:</Card.Title>
                    <Card.Text>
                    <p><strong>Solicite aqui novos títulos:</strong> Se a aventura que você procura ainda não estiver disponível, não se preocupe! Utilize nosso formulário para solicitar a compra de novos livros</p>
                    </Card.Text>
                    <Link className="btn btn-outline-dark my-1 w-80 shadow-lg" to="/catalog/add">Solicite seu livro</Link>
                </CardFooter>
            </Container>
        </main>
    );
};

export default Catalog;


