import { Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.css";


function NotFound() {
    return (
        <main className="notFound">
            <Container className="py-4">
                <Col className="bgSection">
                    <h1>Ops!</h1>
                    <p>404.</p>
                    <p>Página não encontrada.</p>
                    <Link to="/login" className='text-decoration-none'> 
                    <Button variant="outline-dark">Voltar para Home</Button>
                    </Link>
                </Col>
            </Container>
        </main>
    );
}

export default NotFound;