import "./Ajuda.css";


function Ajuda() {

  return (
    <main>
      <div className="catalogo">
        <h1>MyBook</h1>
        <div className="ajuda conteudo">
          <h2>Encontre Livros</h2> 
          <p>Na My Book, você encontra o que deseja em livros de diversos gêneros 
            como: romance, ficção, geek entre outros.</p>
          <h3>No nosso site você tem acesso a leituras grátis</h3>
          <p>Aqui estão algumas dicas para usar nosso catálogo de livros:</p></div>
          <ul>
            <li>
              Use a barra de pesquisa para encontrar livros por título, autor ou
              gênero.
            </li>
            <li>Clique em um livro para ver mais detalhes.</li>
            <li>Adicione livros à sua lista de desejos.</li>
          </ul>
        </div>
    </main>


  );
}

export default Ajuda;