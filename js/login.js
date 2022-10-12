import { login } from "../lib/banco.js";

const form = document.getElementById('formLogin');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    

    const campoNome = document.getElementById('email').value;
    const campoSenha = document.getElementById('senha').value;
    const obj = {
        email: campoNome,
        senha: campoSenha
    };

    const valido = login(obj);
    if (login(obj)){
        window.location.href = "../index.html";
    }else{
        window.alert('Usuario não cadastrado no sistema!')
    }

    
    
});