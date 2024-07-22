import { addBook } from "../../firebase/bookService";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast" ;
import "./AddBook.css";



const AddBookForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addBook(data);
      toast.success('OK! Em breve disponível!')
    } catch (error) {
      toast.error('Erro ao adicionar o livro: ' + error.message);
    }

    addBook(newBook);
 
  };

  return (
    <main className="main-add">
      <form className="form-section shadow-lg" onSubmit={handleSubmit(onSubmit)}>
        <h1>Solicite seu livro</h1>
        <div>
          <label htmlFor='titulo'>Título:</label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            {...register("title", { required: "Título é obrigatório!" })}
          />
          {errors.title && <small className="invalid">{errors.title.message}</small>}
        </div>
        <div>
          <label htmlFor="genero">Gênero:</label>
          <input
            type="text"
            id="genero"
            className="form-control"
            {...register("genre", { required: "Gênero é obrigatório!" })}
          />
          {errors.genre && <small className="invalid">{errors.genre.message}</small>}
        </div>
        <div>
          <label htmlFor="autor" >Autor:</label>
          <input
            type="text"
            id="autor"
            className="form-control"
            {...register("author", { required: "Autor é obrigatório!" })}
          />
          {errors.author && <small className="invalid">{errors.author.message}</small>}
        </div>
        <div>
          <label htmlFor="ano" >Ano:</label>
          <input
            type="number"
            id="ano"
            className="form-control"
            {...register("year", { required: "Ano é obrigatório!", valueAsNumber: true })}
          />
          {errors.year && <small className="invalid">{errors.year.message}</small>}
        </div>
        <Button variant="outline-dark" className="mt-2 w-80 shadow-lg" type="submit">
          Solicitar Livro
        </Button>
      </form>
    </main>
  );
};

export default AddBookForm;
