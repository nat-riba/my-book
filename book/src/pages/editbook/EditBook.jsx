import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { getBook, updateBook } from "../../firebase/bookService";
import { UsuarioContext } from "../../contexts/UsuarioContext";

import "./EditBook";
import Loader from "../../components/loader/Loader";

function EditBook() {
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const usuario = useContext(UsuarioContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            carregarDados();
        }
    }, [usuario]);

    function carregarDados() {
        getBook(id)
            .then((data) => {
                if (data) {
                    setValue("title", data.title);
                    setValue("genre", data.genre);
                    setValue("author", data.author);
                    setValue("year", data.year);
                    setLoading(false);
                } else {
                    toast.error("Livro não encontrado");
                    navigate("/catalog");
                }
            })
            .catch((error) => {
                console.error("Error fetching book: ", error);
                toast.error("Erro ao carregar dados do livro");
                navigate("/catalog");
            });
    }

    const onSubmit = (data) => {
        updateBook(id, data)
            .then(() => {
                toast.success("Livro atualizado com sucesso!");
                navigate("/catalog");
            })
            .catch((error) => {
                console.error("Error updating book: ", error);
                toast.error("Erro ao atualizar o livro");
            });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="main-edit">
            <form className="form-section shadow-lg" onSubmit={handleSubmit(onSubmit)}>
                <h1>Editar Livro</h1>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        {...register("title", { required: "Título é obrigatório!" })}
                    />
                    {errors.title && <small className="invalid">{errors.title.message}</small>}
                </div>
                <div>
                    <label htmlFor="genre">Gênero:</label>
                    <input
                        type="text"
                        id="genre"
                        className="form-control"
                        {...register("genre", { required: "Gênero é obrigatório!" })}
                    />
                    {errors.genre && <small className="invalid">{errors.genre.message}</small>}
                </div>
                <div>
                    <label htmlFor="author">Autor:</label>
                    <input
                        type="text"
                        id="author"
                        className="form-control"
                        {...register("author", { required: "Autor é obrigatório!" })}
                    />
                    {errors.author && <small className="invalid">{errors.author.message}</small>}
                </div>
                <div>
                    <label htmlFor="year">Ano:</label>
                    <input
                        type="number"
                        id="year"
                        className="form-control"
                        {...register("year", {
                            required: "Ano é obrigatório!",
                            valueAsNumber: true
                        })}
                    />
                    {errors.year && <small className="invalid">{errors.year.message}</small>}
                </div>
                <Button variant="outline-dark" className="mt-2 w-80 shadow-lg" type="submit">
                    Atualizar Livro
                </Button>
            </form>
        </main>
    );
}

export default EditBook;
