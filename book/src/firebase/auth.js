// O objetivo deste arquivo é ter todas as funções relacionadas a autenticação 
// Criar usuário com email/senha/nome
// Entrar com Google 
// Entrar com email/senha
// Logout

import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

export async function cadastrarUsuario(nome, email, senha) {
    
    const { user } = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(user, { displayName: nome });
}

export async function entrarGoogle() {

    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
}


export async function loginUsuario(email, senha) {
    await signInWithEmailAndPassword(auth, email, senha);

}

export async function logout() {
    // Desconecta o usuário atualmente logado na aplicação
    await signOut(auth);

}