import { Button } from "react-bootstrap";
import "./Login.css";
import logo from "../assets/img/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {  entrarGoogle, loginUsuario } from "../../firebase/auth";



function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm (); // register = registra inputs

    const navigate = useNavigate(); // Navegação imperativa ou programática

    const onSubmit = (data) => { // Aqui para autenticar o usuário
        loginUsuario(data.email, data.senha).then(() => {
            toast.success("Bem-vindo (a)!");
            navigate("/tarefas");
        }).catch(() => {
            toast.error("Email e/ou senha incorreto!");
            // pode colocar um alert("Um erro aconteceu!")
        });
    }

    function handleEntrarGoogle() { // Autenticação google
        entrarGoogle().then(() => {
         toast.success("Bem-vindo (a)!");
         navigate("/tarefas");
        });
    }

    return(
        <main>
            <form className="form-section" onSubmit={handleSubmit(onSubmit)}>
            <img src={logo} alt="Logo" style={{ borderRadius: '50%',  width: '100px', height: '100px' }} />    
            <h1>Faça seu login</h1>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Digite seu email"
                    {...register("email", {
                        required:"Campo obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido"
                        }
                    })}    
                />
                {errors.email && <small className="invalid">{errors.email.message}</small>}
            </div>
            <div>
                <label htmlFor="senha">Senha</label>
                <input 
                    type="password"
                    id="senha"
                    className="form-control"
                    placeholder="Digite sua senha"
                    {...register("senha", {required: "Campo obrigatório", minLength: {value: 6, message: "Mínimo de 6 caracteres!"}})}
                />
                {errors.senha && <small className="invalid">{errors.senha.message}</small>}
            </div>
            <Button variant="outline-dark" className="mt-1 w-100" type="submit">Entrar</Button>
            <Button variant="outline-danger" className="mt-1 w-100" type="button" onClick={handleEntrarGoogle}>Entrar com Google</Button>
            </form>
            
        </main>
    );
}


export default Login;