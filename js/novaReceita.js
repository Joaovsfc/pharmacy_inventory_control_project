import { inserir } from "../lib/banco.js";

//enviando formulario
const form = document.getElementById('formReceita');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const campoNomeCliente = document.getElementById('nome');
    const campoDescricaoCliente = document.getElementById('descricao');
    const campoData = new Date().toLocaleDateString();
    const bodyTable = document.getElementById('bodyTable');

    if (bodyTable.children.length > 0) {
        const arrayProdutos = [];
        for (let index = 0; index < bodyTable.children.length; index++) {
            const data = {
                quantidade: bodyTable.children[index].children[2].textContent,
                nome: bodyTable.children[index].children[1].textContent
            }
            arrayProdutos.push(data);
            bodyTable.children[index].innerHTML = "";
        }

        const dados = {
            nome: campoNomeCliente.value,
            descricao: campoDescricaoCliente.value,
            produtos: arrayProdutos,
            data: campoData
        };
        inserir(dados);
        campoDescricaoCliente.value = "";
        campoNomeCliente.value = "";
    }

});

//Adicionando items na tabela
const buttonAdicionar = document.getElementById('adicionar');
buttonAdicionar.addEventListener('click', (e) => {
    e.preventDefault();
    const compoProduto = document.getElementById('produto');
    const compoQuantidade = document.getElementById('quantidade');

    if (compoQuantidade.value && compoProduto.value) {
        const bodyTable = document.getElementById('bodyTable');
        const row = document.createElement('tr');
    
        const colIdentificadorProduto = document.createElement('th');
        colIdentificadorProduto.scope = "row";
        colIdentificadorProduto.textContent = bodyTable.children.length + 1;
    
        const colNomeProduto = document.createElement('td');
        colNomeProduto.textContent = compoProduto.value;
    
        const colQuantidadeProduto = document.createElement('td');
        colQuantidadeProduto.classList.add("text-center");
        colQuantidadeProduto.textContent = compoQuantidade.value;
    
        const colAcoes = document.createElement('td');
        colAcoes.classList.add("text-center");
        const trash = document.createElement('i');
        trash.id = bodyTable.children.length + 1 + "trash";
        trash.classList.add("bi");
        trash.classList.add("bi-trash-fill");
        colAcoes.appendChild(trash);
    
        row.appendChild(colIdentificadorProduto);
        row.appendChild(colNomeProduto);
        row.appendChild(colQuantidadeProduto);
        row.appendChild(colAcoes);
    
        bodyTable.appendChild(row);
        compoProduto.value = "";
        compoQuantidade.value = "";

        for (let index = 0; index < bodyTable.children.length; index++) {
            if (bodyTable.children[index].children[3]) {
                var itemTrash = bodyTable.children[index].children[3].children[0];
                itemTrash.addEventListener('click', () => {
                    bodyTable.children[index].innerHTML = "";
                })
            }
        }
    }

})