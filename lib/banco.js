function pegarDados() {
    return JSON.parse(localStorage.getItem("bancoInova"));
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
function remover(dado) {
    banco.pop(dado);
}

export { inserir, remover, pegarDados }