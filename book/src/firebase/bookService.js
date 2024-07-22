import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./config";

// Create - Cria uma referência para a coleção no Firestore, gerando uma coleção chamada "books"
export const booksCol = collection(db, "bookcatalog");

// Função para adicionar um livro
export async function addBook(data) { 
    await addDoc(booksCol, data); // data = dados do formulário preenchido pelo usuário em BookForm.jsx
}

// Função para listar todos os livros
export async function getBooks() {
    const snapshot = await getDocs(booksCol); // Snapshot = é o resultado da busca na coleção de livros
    const books = []; // Aqui fica todos os documentos do BD. Array vazio que vai inserir os obj na forma de obj e não de doc como vem do Firebase

    // Percorremos cada documento da coleção e inserimos no array de livros, criado logo acima que está vazio
    snapshot.forEach(doc => { // O doc foi criado pelo firebase e nomeado aqui como referência a ele, detalhe tem que fazer o processo do id para este ser visualizado
        books.push({...doc.data(), id: doc.id});
    })

    return books; // Daqui vai para suas livros em forma de cards
}

// Filtrar livros por usuário
export async function getBooksByUser(userId) {
    // Filtrar os livros da coleção de acordo com o id do usuario
    const filtro = query(booksCol, where("userId", "==", userId));
    
    const snapshot = await getDocs(filtro);

    const books = [];

    snapshot.forEach((doc) => {
        books.push({...doc.data(), id: doc.id});
    })

    return books;
}

// Função para deletar um livro
export async function deleteBook(id) {
    // Cria referência para documento da coleção. O parâmetro é a coleção e id que quero apagar
    const bookDoc = doc(booksCol, id);
    // Deleta o documento da coleção de acordo com o id
    await deleteDoc(bookDoc);
}

// Função para pegar um livro específico pelo id
export async function getBook(id) {
    // Cria uma referência para um documento específico da coleção
    const bookDoc = doc(booksCol, id);

    // Trazer as informações do documento
    const snapshot = await getDoc(bookDoc);

    // Retorna os dados dentro do documento sendo o snapshot mais geral e o data mais específico
    return snapshot.data();
}

// Função para atualizar um livro
export async function updateBook(id, data) {
    const bookDoc = doc(booksCol, id);
    await updateDoc(bookDoc, data);
}
