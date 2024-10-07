let timerInterval;
let seconds = 0;
let currentPhase = 0; // Fase do protocolo (0: Aquecimento, 1: Incremento 1, etc.)
let isRunning = false;

// Fases do protocolo
const phases = [
    { name: 'Aquecimento', duration: 120, color: '#FF0000' }, // 2 minutos
    { name: 'Incremento 1', duration: 60, color: '#FFA500' }, // 1 minuto
    { name: 'Incremento 2', duration: 60, color: '#FFFF00' }, // 1 minuto
    { name: 'Incremento 3', duration: 60, color: '#008000' }, // 1 minuto
    { name: 'Resfriamento', duration: 120, color: '#0000FF' } // 2 minutos
];

// Função para iniciar o cronômetro
function startTimer() {
    if (isRunning) return; // Evitar múltiplos cronômetros rodando
    isRunning = true;
    clearInterval(timerInterval);
    seconds = 0;
    currentPhase = 0; // Resetar para o aquecimento
    updatePhase(); // Atualizar fase e cor

    timerInterval = setInterval(function () {
        seconds++;

        // Calcular horas, minutos e segundos
        const hrs = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        document.getElementById('timer').innerText = `${String(hrs).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        // Se a fase atual acabar, ir para a próxima
        if (seconds >= phases[currentPhase].duration) {
            currentPhase++;
            if (currentPhase < phases.length) {
                seconds = 0;
                updatePhase(); // Atualizar fase e cor
                // Mostrar aviso de preparação
                showPhaseMessage(`Prepare-se para ${phases[currentPhase].name}`);
            } else {
                clearInterval(timerInterval); // Parar o cronômetro
                isRunning = false;
                showPhaseMessage("Protocolo concluído!");
            }
        }
    }, 1000); // Atualizar a cada segundo
}

// Função para atualizar a cor da fase e exibir fase atual
function updatePhase() {
    document.getElementById('timer').style.color = phases[currentPhase].color;
    document.getElementById('phase-message').innerText = `Fase Atual: ${phases[currentPhase].name}`;
}

// Função para exibir uma mensagem sobre a fase atual
function showPhaseMessage(message) {
    const phaseMessageElement = document.getElementById('phase-message');
    phaseMessageElement.innerText = message;
    phaseMessageElement.style.display = 'block';
    setTimeout(() => {
        phaseMessageElement.style.display = 'none';
    }, 5000); // Ocultar após 5 segundos
}

// Função para analisar os dados e parar o cronômetro
function analyzeData() {
    clearInterval(timerInterval); // Parar o cronômetro
    isRunning = false; // Garantir que o cronômetro pare
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
