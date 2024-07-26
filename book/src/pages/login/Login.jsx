import { Button } from "react-bootstrap";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { entrarGoogle, loginUsuario } from "../../firebase/auth";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        loginUsuario(data.email, data.senha).then(() => {
            toast.success("Bem-vindo (a)!");
            navigate("/catalog");
        }).catch(() => {
            toast.error("Email e/ou senha incorreto!");
        });
    }

    const handleEntrarGoogle = () => {
        entrarGoogle().then(() => {
            toast.success("Bem-vindo (a)!");
            navigate("/catalog");
        });
    }

    return (
        <main className="main-login">
            <form className="form-section" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login com a sua conta Google</h2>
                <Button variant="outline-danger mt-3 w-100" className="mt-3" type="button" onClick={handleEntrarGoogle}>
                    Google
                </Button>
                <hr />
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Digite seu email"
                        {...register("email", {
                            required: "Campo obrigatório",
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
                        {...register("senha", {
                            required: "Campo obrigatório", 
                            minLength: {
                                value: 6, 
                                message: "Mínimo de 6 caracteres!"
                            }
                        })}
                    />
                    {errors.senha && <small className="invalid">{errors.senha.message}</small>}
                </div>
                <Button  className="mt-5 custom-button" type="submit">Entrar</Button>
            </form>
        </main>
    );
}

export default Login;
