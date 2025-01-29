let listaNumeroSorteados = []; 
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate: 1.2});

}

function exibirMensagemInicial() { 
    exibirTextoNaTela('h1', 'BEM VINDO AO SEGUNDO PROJETINHO DO NUMERO SECRETO');
    exibirTextoNaTela('p', 'escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value); 
    console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'FINALMENTE ACERTOU!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Mesmo vc com esse QI de uma porta descobriu o número em ${tentativas} ${palavraTentativa}, Parabéns... eu acho`;
        exibirTextoNaTela('p', mensagensTentativas); 
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Claro que ia errar, mas uma dica pra você: o número é menor que esse aí.');
        } else {
            exibirTextoNaTela('p', 'Claro que ia errar, mas uma dica pra você: o número é maior que esse aí.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumeroSorteados.length;

    if (quantidadeDeElementosNaLista == 100) { 
        listaNumeroSorteados = []; 
    }

    if (listaNumeroSorteados.includes(numeroEscolhido)) { 
        return gerarNumeroAleatorio(); 
    } else {
        listaNumeroSorteados.push(numeroEscolhido);
        console.log(listaNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input'); 
    chute.value = ''; 
}

function reiniciarjogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial(); 
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
document.getElementById('reiniciar').addEventListener('click', reiniciarjogo);
