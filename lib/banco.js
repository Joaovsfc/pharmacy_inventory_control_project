function pegarDados(key) {
    key = key ? key : "bancoInova";
    return JSON.parse(sessionStorage.getItem(key));
}

var data = JSON.parse(sessionStorage.getItem("bancoInova"));
function inserir(dado) {
    
    if (!data) {
        data = [];
        data.push(dado);
    } else {
        data.push(dado);
    }
    sessionStorage.setItem("bancoInova", JSON.stringify(data));
}

function inserirUser(dado) {
    sessionStorage.setItem("loginInova", JSON.stringify(dado));
} 

function remover(dado) {
    banco.pop(dado);
}

export { inserir, remover, pegarDados, inserirUser }