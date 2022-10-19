import { pegarDados } from "../lib/banco.js";

const login = pegarDados("loginInova");
if (!login) window.location.href = "../index.html";
const nomeUser = document.getElementById("nomeUser");
nomeUser.textContent = login.nome + "!";

const estoque = document.getElementById("estoque");
estoque.addEventListener('click', () => {
    window.location.href = "../estoque.html"
})

const result = pegarDados();

if (result) {
    var contadorDiv = 0;
    result.map((resultado) => {
        if (resultado.entregue === false) {
            contadorDiv++;

            //Criando Modal para abrir a receita
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.id = "modal-" + contadorDiv;

            //Modal dialog
            const modalDialog = document.createElement('div');
            modalDialog.classList.add('modal-dialog');

            //Modal content
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');

            //Modal header
            const modalHeader = document.createElement('div');
            modalHeader.classList.add('modal-header');

            //h1 header;
            const h1ModalHeader = document.createElement('h1');
            const textoH1Header = document.createTextNode(resultado.nome);
            h1ModalHeader.appendChild(textoH1Header);
            modalHeader.appendChild(h1ModalHeader);

            //BodyModal
            const modalBody = document.createElement('div');
            modalBody.classList.add('modal-body');
            
            //montando descricao para cada produto;
            resultado.produtos.map(produto => {
                const pBodyModal = document.createElement('p');
                pBodyModal.innerText = produto.quantidade + "x - " + produto.nome;
                modalBody.appendChild(pBodyModal);
            })

            //divider body modal
            const dividerBody = document.createElement('hr');
            modalBody.appendChild(dividerBody);

            //descricao da receita modal
            const pDescricaoModal = document.createElement('p');
            pDescricaoModal.innerText = resultado.descricao;
            modalBody.appendChild(pDescricaoModal);

            modalContent.appendChild(modalHeader);
            modalContent.appendChild(modalBody);
            modalDialog.appendChild(modalContent);
            modal.appendChild(modalDialog);

            //Tirando alerta sem nenhuma receita 
            const alertReceitas = document.getElementById('alertReceitas');
            alertReceitas.classList.add('d-none');
    
            //div responsavel por todos os elementos
            const response = document.getElementById('response');
            
            //div card pai
            const elementDivCard = document.createElement('div');
            elementDivCard.classList.add('card');
            elementDivCard.classList.add('text-center');
            elementDivCard.classList.add('mt-2');
            elementDivCard.dataset.bsToggle = "modal";
            elementDivCard.dataset.bsTarget = "#modal-" + contadorDiv;
        
            //body do card
            const elementDivCardBody = document.createElement('div');
            elementDivCardBody.classList.add('card-body');
        
            //textos para inserir no body **
            //texto h5
            const h5 = document.createElement('h5');
            h5.classList.add('card-title');
            const textTitle = document.createTextNode(resultado.nome);
            h5.appendChild(textTitle);
    
            //p data
            const pData = document.createElement('p');
            pData.classList.add('text-muted');
            const textoData = document.createTextNode("Solicitado dia " + resultado.data);
            pData.appendChild(textoData);
    
            //p redicamento
            const pDescricao = document.createElement('p');
            pDescricao.classList.add('card-text');
            const textoDescricao = document.createTextNode(resultado.descricao);
            pDescricao.appendChild(textoDescricao);
            
            //div footer
            let dataA = new Date().toLocaleDateString();
            const dataASeparada = dataA.split("/")
            dataA = dataASeparada[1] + "/" + dataASeparada[0] + "/" + dataASeparada[2];
    
            let dataB = resultado.data
            const dataBSeparada = dataB.split("/")
            dataB = dataBSeparada[1] + "/" + dataBSeparada[0] + "/" + dataBSeparada[2];
    
            const diff = new Date(dataA) - new Date(dataB);
            const diffInDays = diff / (1000 * 3600 * 24);
    
            const elementDivCardFooter = document.createElement('div');
            elementDivCardFooter.classList.add('card-footer');
            elementDivCardFooter.classList.add('text-muted');
    
            const textoFooter = document.createTextNode(
                diffInDays <= 1 ? 
                    diffInDays == 1 ? 
                        "Ontem" : 
                        "Criado agora" 
                    : diffInDays + " dias atrás");
            elementDivCardFooter.appendChild(textoFooter);
    
            //Montar elemento
            //body
            elementDivCardBody.appendChild(h5);
            elementDivCardBody.appendChild(pData);
            elementDivCardBody.appendChild(pDescricao);
    
            //Card
            elementDivCard.appendChild(elementDivCardBody);
            elementDivCard.appendChild(elementDivCardFooter);
    
            response.appendChild(modal);
            response.appendChild(elementDivCard);
        }
    })
}

//Pesquiar cliente
const buttonPesquisar = document.getElementById("buttonPesquisar");
buttonPesquisar.addEventListener('click', () => {
    const inputPesquisar = document.getElementById("inputPesquisar");
    const nomeEncontrado = result.filter((receita) => {
        return receita.nome.toLowerCase().includes(inputPesquisar.value.toLowerCase());
    });
    
    const response = document.getElementById('response');
    response.innerHTML = "";

    if (nomeEncontrado.length == 0) {
        //Montar div alert
        const divAlert = document.createElement('div');
        divAlert.classList.add("alert");
        divAlert.classList.add("text-center");
        divAlert.classList.add("alert-warning");
        divAlert.textContent = "Filtro sem resultados";

        response.appendChild(divAlert);
    } else {
        nomeEncontrado.map((resultado) => {
            if (resultado.entregue === false) {
                //div card pai
                const elementDivCard = document.createElement('div');
                elementDivCard.classList.add('card');
                elementDivCard.classList.add('text-center');
                elementDivCard.classList.add('mt-2');
            
                //body do card
                const elementDivCardBody = document.createElement('div');
                elementDivCardBody.classList.add('card-body');
            
                //textos para inserir no body **
                //texto h5
                const h5 = document.createElement('h5');
                h5.classList.add('card-title');
                const textTitle = document.createTextNode(resultado.nome);
                h5.appendChild(textTitle);
        
                //p data
                const pData = document.createElement('p');
                pData.classList.add('text-muted');
                const textoData = document.createTextNode("Solicitado dia " + resultado.data);
                pData.appendChild(textoData);
        
                //p redicamento
                const pDescricao = document.createElement('p');
                pDescricao.classList.add('card-text');
                const textoDescricao = document.createTextNode(resultado.descricao);
                pDescricao.appendChild(textoDescricao);
                
                //div footer
                let dataA = new Date().toLocaleDateString();
                const dataASeparada = dataA.split("/")
                dataA = dataASeparada[1] + "/" + dataASeparada[0] + "/" + dataASeparada[2];
        
                let dataB = resultado.data
                const dataBSeparada = dataB.split("/")
                dataB = dataBSeparada[1] + "/" + dataBSeparada[0] + "/" + dataBSeparada[2];
        
                const diff = new Date(dataA) - new Date(dataB);
                const diffInDays = diff / (1000 * 3600 * 24);
        
                const elementDivCardFooter = document.createElement('div');
                elementDivCardFooter.classList.add('card-footer');
                elementDivCardFooter.classList.add('text-muted');
        
                const textoFooter = document.createTextNode(
                    diffInDays <= 1 ? 
                        diffInDays == 1 ? 
                            "Ontem" : 
                            "Criado agora" 
                        : diffInDays + " dias atrás");
                elementDivCardFooter.appendChild(textoFooter);
        
                //Montar elemento
                //body
                elementDivCardBody.appendChild(h5);
                elementDivCardBody.appendChild(pData);
                elementDivCardBody.appendChild(pDescricao);
        
                //Card
                elementDivCard.appendChild(elementDivCardBody);
                elementDivCard.appendChild(elementDivCardFooter);
        
                response.appendChild(elementDivCard);
            }
        })
    }
})