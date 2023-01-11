//Variaveis para ter valores certos
var dificuldade = document.getElementById("dificuldade");
var tipo = document.getElementById("tipo");
var categoria = document.getElementById("categoria");
var questoes = document.getElementById("questoes");

//Variaveis do jogo
var perguntas = document.getElementById("perguntas");
var pontos = document.getElementById("pontos");
var inserirNome = document.getElementById("inserirNome");
var numeroQuestoes = document.getElementById("numeroQuestoes");

//Variavel dos buttoes das respostas
var resposta1 = document.createElement("button");
var resposta2 = document.createElement("button");
var resposta3 = document.createElement("button");
var resposta4 = document.createElement("button");

var divR1 = document.getElementById("divR1");
var divR2 = document.getElementById("divR2");
var divR3 = document.getElementById("divR3");
var divR4 = document.getElementById("divR4");

resposta1.className = "resposta";
resposta2.className = "resposta";
resposta3.className = "resposta";
resposta4.className = "resposta";

//variaveis das divisoes
var menuInicial = document.getElementById("menuInicial");
var jogo = document.getElementsByClassName("jogo")[0];
var scoreBoard = document.getElementById("scoreBoard");

//Variavel Pontuação que ira ser alterada
var pontuacao = new Pontos(0);
pontos.innerHTML = "Pontuação: " + pontuacao.pontuacao;

//Variavel do link da API
var link = "https://opentdb.com/api.php";

//Variavel do botao para começar
var comecarJogo = document.getElementById("comecarJogo");

var recomecar = document.getElementById("recomecar");

var index;
var obk;
var k = 0;

function callTime() {

    questoes = questoes.value;
    dificuldade = dificuldade.selectedOptions[k].value;
    categoria = categoria.selectedOptions[k].value;
    tipo = tipo.selectedOptions[k].value;

    //Variavel para caso o jogador nao escolha a opção
    var dificuldade1 = "&difficulty=" + dificuldade;
    var tipo1 = "&type=" + tipo;
    var categoria1 = "&category=" + categoria;

    if (dificuldade == "any") {
        dificuldade1 = "";
    }

    if (tipo == "any") {
        tipo1 = "";
    }

    if (categoria == "any") {
        categoria1 = "";
    }



    var request = new XMLHttpRequest()
    request.open('GET', link + "?" + "amount=" + questoes + categoria1 + dificuldade1 + tipo1, true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            obk = data;
            //console.log(obk);

            menuInicial.style.display = "none";
            jogo.style.display = "block";

            obk.results[k].question;
            obk.results[k].incorrect_answers[0];
            obk.results[k].incorrect_answers[1];
            obk.results[k].incorrect_answers[2];
            obk.results[k].correct_answer;

            opacaoEscolha();

        } else {
            alert(request.status)
        }
    }
    request.send();
}


// Função para quando é escolha multipla
function opacaoEscolha() {

    if (k == obk.results.length) {
        fimJogo();
    } else {

        numeroQuestoes.innerHTML = k + 1 + "/" + obk.results.length;

        perguntas.innerHTML = obk.results[k].question;


        // Se o tipo do array for multiple faz isto
        if (obk.results[k].type == "multiple") {

            resposta1.innerHTML = obk.results[k].incorrect_answers[0];
            resposta2.innerHTML = obk.results[k].incorrect_answers[1];
            resposta3.innerHTML = obk.results[k].incorrect_answers[2];
            resposta4.innerHTML = obk.results[k].correct_answer;
            resposta1.style.display = "block";
            resposta2.style.display = "block";
            resposta3.style.display = "block";
            resposta4.style.display = "block";
            aleatorioMultiple();
        }

        // Se o tipo do array for boolean faz isto
        if (obk.results[k].type == "boolean") {

            resposta1.innerHTML = obk.results[k].incorrect_answers[0];
            resposta4.innerHTML = obk.results[k].correct_answer;
            resposta2.style.display = "none";
            resposta3.style.display = "none";
            aleatorioBoolean();
        }
    }
}

// Função para randomizar as opções multiplas
function aleatorioMultiple() {
    if (obk.results[k].type == "multiple") {
        var choose = Math.floor(Math.random() * 4);
        if (choose == 0) {
            divR1.append(resposta4);
            divR2.append(resposta1);
            divR3.append(resposta3);
            divR4.append(resposta2);
        } else if (choose == 1) {
            divR1.append(resposta1);
            divR2.append(resposta4);
            divR3.append(resposta2);
            divR4.append(resposta3);
        } else if (choose == 2) {
            divR1.append(resposta1);
            divR2.append(resposta2);
            divR3.append(resposta4);
            divR4.append(resposta3);
        } else if (choose == 3) {
            divR1.append(resposta2);
            divR2.append(resposta3);
            divR3.append(resposta1);
            divR4.append(resposta4);
        }
        k++;

    }

}

// Função para randomizar opções verdadeiro ou falso
function aleatorioBoolean() {
    if (obk.results[k].type == "boolean") {
        if (obk.results[k].correct_answer == "True") {
            divR1.append(resposta4);
            divR2.append(resposta1);
            divR3.append(resposta2);
            divR4.append(resposta3);
        } else {
            divR1.append(resposta1);
            divR2.append(resposta4);
            divR3.append(resposta3);
            divR4.append(resposta2);
        }

        k++;
    }
}

// Função para quando clica na opção correta aumentar um ponto
function acertou() {
    var delayInMilliseconds = 1000; //1 second
    resposta4.style.background = "green";
    setTimeout(function() {
        pontuacao.increasePontuacao();
        pontos.innerHTML = "Pontuação: " + pontuacao.pontuacao;
        resposta4.style.background = "var(--azul)";
        opacaoEscolha();
    }, delayInMilliseconds);
}

function falhou(e) {
    var delayInMilliseconds = 1000; //1 second
    e.target.style.background = "red";
    setTimeout(function() {
        resposta1.style.background = "var(--azul)";
        resposta2.style.background = "var(--azul)";
        resposta3.style.background = "var(--azul)";
        opacaoEscolha();
    }, delayInMilliseconds);
}


function fimJogo() {
    perguntas.style.display = "none";
    resposta1.style.display = "none";
    resposta2.style.display = "none";
    resposta3.style.display = "none";
    resposta4.style.display = "none";

    jogo.style.display = "none";
    scoreBoard.style.display = "block";

    tabela();

}

function tabela() {
    var table = document.getElementById("table");

    let tbody = document.createElement('tbody');


    table.appendChild(tbody);



    // Creating and adding data to second row of the table
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "Nome";
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "Pontos";


    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    tbody.appendChild(row_2);


    // Creating and adding data to third row of the table
    let row_3 = document.createElement('tr');
    let row_3_data_1 = document.createElement('td');
    row_3_data_1.innerHTML = inserirNome.value;
    let row_3_data_2 = document.createElement('td');
    row_3_data_2.innerHTML = pontuacao.pontuacao;


    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
    tbody.appendChild(row_3);
}

function recomecarJogo() {
    location.reload();
}

// Eventos de todos os clicks
resposta1.addEventListener("click", falhou);
resposta2.addEventListener("click", falhou);
resposta3.addEventListener("click", falhou);
resposta4.addEventListener("click", acertou);
comecarJogo.addEventListener("click", callTime);
recomecar.addEventListener("click", recomecarJogo);