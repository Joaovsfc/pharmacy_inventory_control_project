import { inserirUser } from "../lib/banco.js";
const userVerify = [
    {
        nome: "Marciano",
        email: "teste@email.com",
        senha: "123"
    },
    {
        nome: "Janislei",
        email: "teste@gmail.com",
        senha: "1234"
    }
];

const form = document.getElementById('formLogin');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const campoEmail = document.getElementById('email').value;
    const campoSenha = document.getElementById('senha').value;
    
    userVerify.map((user) => {
        if (user.email === campoEmail && user.senha === campoSenha) {
            inserirUser(user);
            window.location.href = "../home.html";
        }
    });
    const alertError = document.getElementById("alertError");
    alertError.classList.remove("d-none");
});