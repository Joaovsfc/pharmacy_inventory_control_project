function pegarDados(key) {
    key = key ? key : "bancoInova";
    return JSON.parse(localStorage.getItem(key));
}

var data = JSON.parse(localStorage.getItem("bancoInova"));
function inserir(dado) {
    
    if (!data) {
        data = [];
        data.push(dado);
    } else {
        data.push(dado);
    }
    localStorage.setItem("bancoInova", JSON.stringify(data));
}

function inserirUser(dado) {
    localStorage.setItem("loginInova", JSON.stringify(dado));
} 

function remover(dado) {
    banco.pop(dado);
}

export { inserir, remover, pegarDados, inserirUser }