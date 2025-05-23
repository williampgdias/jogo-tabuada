const perguntaEl = document.getElementById('pergunta');
const respostasEl = document.getElementById('respostas');
const cronometroEl = document.getElementById('cronometro');
const feedbackEl = document.getElementById('feedback');

let tempo = 10;
let timer;
let respostaCorreta = 0;

/**
 * Função para calcular a resposta correta com base na operação
 */
function gerarPergunta() {
    // 1.Gerar números aleatórios
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    // 2.Gerar operação aleatória
    const operadores = ['+', '-', '*', '/'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];

    // 3.Gerar pergunta
    let perguntaTexto = `${num1} ${operador} ${num2}`;
    respostaCorreta = calcular(num1, num2, operador);

    // 4. Atualizar no HTML
    perguntaEl.textContent = perguntaTexto;

    //5. Gerar respostas
    gerarRespostas(respostaCorreta);

    //6.Resetar feedback e cronômetro
    feedbackEl.textContent = '';
    iniciarCronometro();
}

function calcular(a, b, op) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return parseFloat((a / b).toFixed(2));
    }
}
