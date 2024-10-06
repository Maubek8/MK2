let timerInterval;
let seconds = 0;

// Função para iniciar o cronômetro
function startTimer() {
    seconds = 0; // Resetar o cronômetro
    timerInterval = setInterval(function() {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        // Mudar cores e avisos conforme o tempo
        const phase = Math.floor(seconds / 60); // Definir fase com base nos segundos
        if (phase === 0) {
            document.getElementById('timer').style.color = '#FF0000'; // Vermelho durante o aquecimento
            alert("Início da fase de Aquecimento!");
        } else if (phase === 2) {
            document.getElementById('timer').style.color = '#FFA500'; // Laranja durante o incremento 1
            alert("Início da fase de Incremento 1!");
        } else if (phase === 3) {
            document.getElementById('timer').style.color = '#FFFF00'; // Amarelo durante o incremento 2
            alert("Início da fase de Incremento 2!");
        } else if (phase === 4) {
            document.getElementById('timer').style.color = '#008000'; // Verde durante o incremento 3
            alert("Início da fase de Incremento 3!");
        } else if (phase === 5) {
            document.getElementById('timer').style.color = '#0000FF'; // Azul durante o resfriamento
            alert("Início da fase de Resfriamento!");
        }
    }, 1000);
}

// Adicionar evento de clique no botão de iniciar
document.getElementById('startButton').addEventListener('click', function() {
    startTimer();
});

// Analisar dados da tabela preliminar
document.getElementById('analyzeButton').addEventListener('click', function() {
    const rows = document.querySelectorAll('#preliminary-table tbody tr');
    
    rows.forEach((row, index) => {
        const fc = row.querySelectorAll('input')[0].value || 'N/A';
        const pse = row.querySelectorAll('input')[1].value || 'N/A';

        // Atualiza a tabela do Protocolo MMA
        if (index === 0) { // Aquecimento
            document.getElementById(`fc-aquecimento-mk`).value = fc;
            document.getElementById(`pse-aquecimento-mk`).value = pse;
        }
        // Adicionar lógica para as outras fases...
    });

    // Exibir o botão de imprimir
    document.getElementById('printButton').style.display = 'inline-block';
});

// Adicionar evento de clique no botão de imprimir
document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});
