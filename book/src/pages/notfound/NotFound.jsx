import { Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.css";
import logo from "../assets/img/logo.png";


function NotFound() {
    return (
        <main className="notFound">
            <Container className="py-4">
                <Col className="bgSection">
                    <img src={logo} alt="Logo" style={{ borderRadius: '50%',  width: '150px', height: '150px' }} />
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