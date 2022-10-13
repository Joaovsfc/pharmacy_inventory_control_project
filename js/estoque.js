import { pegarDados } from "../lib/banco.js";

const login = pegarDados("loginInova");
if (!login) window.location.href = "../index.html";
const nomeUser = document.getElementById("nomeUser");
nomeUser.textContent = login.nome + "!";

const home = document.getElementById("home");
home.addEventListener('click', () => {
    window.location.href = "../home.html"
});

//Pegar item selecionado
const exampleDataList = document.getElementById("exampleDataList");
exampleDataList.addEventListener("change", (element) => {
    const resultadoProduto = document.getElementById("resultadoProduto");
    resultadoProduto.innerHTML = "";

    if (element.target.value === "") return;
    const resultBanco = pegarDados();
    if (resultBanco) {
        //criar h1 do nome do produto
        const h1NomeProduto = document.createElement("h1");
        h1NomeProduto.classList.add("text-center")
        h1NomeProduto.textContent = element.target.value;
        resultadoProduto.appendChild(h1NomeProduto);

        //criar quatnidade disponivel do produto
        const h5QuantidadeProduto = document.createElement("h5");
        h5QuantidadeProduto.classList.add("text-center");
        h5QuantidadeProduto.textContent = "Quantidade disponível: 50 und";
        resultadoProduto.appendChild(h5QuantidadeProduto);

        //div de progresso produto
        const divProgresso = document.createElement("div");
        divProgresso.classList.add("progress");

        const progresso = document.createElement("div");
        progresso.classList.add("progress-bar");
        progresso.classList.add("bg-success");
        progresso.style.width = "50%";
        progresso.textContent = "50/100";

        divProgresso.appendChild(progresso);
        resultadoProduto.appendChild(divProgresso);

        //criando tabela dos clientes com esse produto
        const table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("mt-3");

        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");

        const th1Head = document.createElement("th");
        th1Head.classList.add("text-center");
        th1Head.textContent = "Entregue";

        const th2Head = document.createElement("th");
        th2Head.classList.add("text-center");
        th2Head.textContent = "Nome";

        const th3Head = document.createElement("th");
        th3Head.classList.add("text-center");
        th3Head.textContent = "Data";

        const th4Head = document.createElement("th");
        th4Head.classList.add("text-center");
        th4Head.textContent = "Qtd";

        trHead.append(th1Head);
        trHead.append(th2Head);
        trHead.append(th3Head);
        trHead.append(th4Head);
        thead.appendChild(trHead);

        //corpo da table
        const tbody = document.createElement("tbody");
        const clientesComProduto = [];

        resultBanco.map((receita) => {
            const resultFilter = receita.produtos.filter((item) => {
                return item.nome.toLowerCase().includes(element.target.value.toLowerCase());
            });
            if (resultFilter.length > 0) clientesComProduto.push({
                nome: receita.nome,
                data: receita.data,
                entregue: receita.entregue,
                quantidade: resultFilter[0].quantidade
            });
        })
    
        clientesComProduto.map((receitaItem) => {
            const trBody = document.createElement("tr");
            const th1Body = document.createElement("th");
            th1Body.classList.add("text-center");
            const inputCheckBox = document.createElement("input");
            inputCheckBox.classList.add("form-check-input");
            inputCheckBox.type = "checkbox";
            th1Body.appendChild(inputCheckBox);
            const td2Body = document.createElement("td");
            td2Body.textContent = receitaItem.nome;
            const td3Body = document.createElement("td");
            td3Body.textContent = receitaItem.data;
            const td4Body = document.createElement("td");
            td4Body.classList.add("text-center");
            td4Body.textContent = receitaItem.quantidade;
    
            trBody.appendChild(th1Body);
            trBody.appendChild(td2Body);
            trBody.appendChild(td3Body);
            trBody.appendChild(td4Body);
            tbody.appendChild(trBody);
        })
        table.appendChild(thead);
        table.appendChild(tbody);
        resultadoProduto.appendChild(table);
    } else {
        const divAlert = document.createElement('div');
        divAlert.classList.add("alert");
        divAlert.classList.add("text-center");
        divAlert.classList.add("alert-danger");
        divAlert.textContent = "Sem estoque";

        resultadoProduto.appendChild(divAlert);
    }
})