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

function gerarRespostas(correta) {
    respostasEl.innerHTML = ''; // Limpar respostas anteriores

    const respostas = new Set();
    respostas.add(correta);

    while (respostas.size < 4) {
        let erro = correta + Math.floor(Math.random() * 10 - 5);
        if (erro !== correta && erro >= 0) {
            respostas.add(erro);
        }
    }

    // Embaralha as respostas
    const embaralhadas = Array.from(respostas).sort(() => Math.random() - 0.5);

    embaralhadas.forEach((resposta) => {
        const btn = document.createElement('button');
        btn.textContent = resposta;
        btn.addEventListener('click', () => verificarResposta(resposta));
        respostasEl.appendChild(btn);
    });
}

function verificarResposta(resposta) {
    clearInterval(timer); // Parar o cronômetro

    if (Number(resposta).toFixed(2) === Number(respostaCorreta).toFixed(2)) {
        feedbackEl.textContent = '✅ Correto!';
        feedbackEl.style.color = 'lightgreen';
    } else {
        feedbackEl.textContent = `❌ Incorreto! A resposta correta era ${respostaCorreta}`;
        feedbackEl.style.color = 'tomato';
    }

    setTimeout(gerarPergunta, 2000); // Gerar nova pergunta após 2 segundos
}

function iniciarCronometro() {
    clearInterval(timer); // Limpar qualquer cronômetro anterior
    tempo = 10;
    cronometroEl.textContent = `⏱ ${tempo}`;

    timer = setInterval(() => {
        tempo--;
        cronometroEl.textContent = `⏱ ${tempo}`;
        if (tempo === 0) {
            clearInterval(timer);
            verificarResposta(null); // Se o tempo acabar, trata como erro
        }
    }, 1000);
}

gerarPergunta();
