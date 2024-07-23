import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario, entrarGoogle } from "../../firebase/auth";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast" ;
import "./Cadastro.css";



function Cadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm ();
    const navigate = useNavigate();

    const cadastrar = (data) => {
        cadastrarUsuario(data.nome, data.email, data.senha).then(() => {
            toast.success(`Bem-vindo (a)! ${data.nome}`);
            navigate("/catalogo");
        }).catch((error) => {
            toast.error("Um erro inesperado aconteceu!");
        });
    } 

    const handleEntrarGoogle = () => {
        entrarGoogle().then(() => {
         toast.success("Bem-vindo (a)!");
         navigate("/catalogo");
        });
    }

    return(
        <main className="main-cadastro">
            <form className="form-section shadow-lg" onSubmit={handleSubmit(cadastrar)}>
                <h1>Faça seu cadastro com:</h1>
                <Button variant="outline-danger" className="mt-3 w-100 shadow-lg" type="button" onClick={handleEntrarGoogle}>
                    Google
                </Button>
                <h1>Ou preencha suas informações: </h1>
                <hr />
                <div>
                    <label htmlFor="nome">Seu nome:</label>
                    <input 
                        type="text"
                        id="nome"
                        className="form-control"
                        maxLength={50}
                        placeholder="Digite seu nome"
                        {...register("nome", {required: "Nome inválido!"})}
                    />
                    {errors.nome && <small className="invalid">{errors.nome.message}</small>}
                </div>
                <div>
                    <label htmlFor="email">Seu email:</label>
                    <input 
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Digite seu email"   
                        {...register("email", {required: "Email inválido, tente novamente!", 
                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, 
                            message: "Email inválido"}})
                        }                     
                    />
                    {errors.email && <small className="invalid">{errors.email.message}</small>}
                </div>
                <div>
                    <label htmlFor="senha">Sua senha:</label>
                    <input 
                        type="password"
                        id="senha"
                        className="form-control"
                        placeholder="Digite sua senha"
                        {...register("senha", {required: "Campo obrigatório", 
                            minLength: {value: 6, message: "Mínimo de 6 caracteres!"}})
                        }
                    />
                    {errors.senha && <small className="invalid" >{errors.senha.message}</small>}
                </div>
                <Button className="mt-5 custom-button" type="submit">
                    Cadastrar
                </Button>
                
            </form>
        </main>

    );
}

export default Cadastro;