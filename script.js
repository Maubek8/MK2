let timerInterval;
let seconds = 0;
let currentPhase = 0; // Fase do protocolo (0: Aquecimento, 1: Incremento 1, etc.)

// Fases do protocolo
const phases = [
    { name: 'Aquecimento', duration: 120, color: '#FF0000' },
    { name: 'Incremento 1', duration: 60, color: '#FFA500' },
    { name: 'Incremento 2', duration: 60, color: '#FFFF00' },
    { name: 'Incremento 3', duration: 60, color: '#008000' },
    { name: 'Resfriamento', duration: 120, color: '#0000FF' }
];

// Função para iniciar o cronômetro
function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    currentPhase = 0; // Resetar para o aquecimento
    updatePhase(); // Atualizar fase e cor

    timerInterval = setInterval(function () {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        // Se a fase atual acabar, ir para a próxima
        if (seconds >= phases[currentPhase].duration) {
            currentPhase++;
            if (currentPhase < phases.length) {
                seconds = 0;
                updatePhase(); // Atualizar fase e cor
            } else {
                clearInterval(timerInterval); // Parar o cronômetro
            }
        }
    }, 1000);
}

// Função para atualizar a cor da fase
function updatePhase() {
    document.getElementById('timer').style.color = phases[currentPhase].color;
}

// Função para analisar os dados (simples exemplo)
function analyzeData() {
    document.getElementById('printButton').style.display = 'inline-block';
    alert("Dados analisados. Pronto para impressão.");
}

// Função para imprimir
function printProtocol() {
    window.print();
}

// Eventos dos botões
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('analyzeButton').addEventListener('click', analyzeData);
document.getElementById('printButton').addEventListener('click', printProtocol);
