const player1Symbol = "X";
const player2Symbol = "O";
let currentPlayer = player1Symbol;
let final = false;
let player1Name = "";
let player2Name = "";
let player1Wins = 0;
let player2Wins = 0;

function atualizaMostrador() {
    if (final) return;
    const currentPlayerDisplay = document.getElementById("current-player");
    currentPlayerDisplay.textContent = (currentPlayer === player1Symbol) ? player1Name : player2Name;
}

function inicializaEspaco() {
    const espacos = document.getElementsByClassName("espaco");
    for (const espaco of espacos) {
        espaco.addEventListener("click", function() {
            if (final) return;
            if (this.innerHTML === "") {
                this.innerHTML = (currentPlayer === player1Symbol) ? "<img src='imagens/x.png'>" : "<img src='imagens/o.png'>";
                this.setAttribute("jogada", currentPlayer);
                currentPlayer = (currentPlayer === player1Symbol) ? player2Symbol : player1Symbol;
                atualizaMostrador();
                verificarVencedor();
            }
        });
    }
}

async function verificarVencedor() {
    const a1 = document.getElementById("a1").getAttribute("jogada");
    const a2 = document.getElementById("a2").getAttribute("jogada");
    const a3 = document.getElementById("a3").getAttribute("jogada");

    const b1 = document.getElementById("b1").getAttribute("jogada");
    const b2 = document.getElementById("b2").getAttribute("jogada");
    const b3 = document.getElementById("b3").getAttribute("jogada");

    const c1 = document.getElementById("c1").getAttribute("jogada");
    const c2 = document.getElementById("c2").getAttribute("jogada");
    const c3 = document.getElementById("c3").getAttribute("jogada");

    let vencedor = "";
    if ((a1 === b1 && a1 === c1 && a1) || (a1 === a2 && a1 === a3 && a1) || (a1 === b2 && a1 === c3 && a1)) {
        vencedor = a1;
    } else if ((b2 === b1 && b2 === b3 && b2) || (b2 === a2 && b2 === c2 && b2) || (b2 === a3 && b2 === c1 && b2)) {
        vencedor = b2;
    } else if ((c3 === c2 && c3 === c1 && c3) || (c3 === a3 && c3 === b3 && c3)) {
        vencedor = c3;
    }

    if (vencedor) {
        final = true;
        if (vencedor === player1Symbol) {
            player1Wins++;
        } else {
            player2Wins++;
        }
        atualizarRanking();
        await sleep(70);
        alert(`O vencedor foi o: '${vencedor === player1Symbol ? player1Name : player2Name}'`);
    } else if (Array.from(document.getElementsByClassName("espaco")).every(espaco => espaco.getAttribute("jogada"))) {
        final = true;
        await sleep(70);
        alert("Empate!");
    }
}

function atualizarRanking() {
    document.getElementById("ranking-player1").textContent = `${player1Name}: ${player1Wins} vitórias`;
    document.getElementById("ranking-player2").textContent = `${player2Name}: ${player2Wins} vitórias`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-game');
    const resetButton = document.getElementById('reset-game');
    const initialScreen = document.getElementById('initial-screen');
    const gameScreen = document.getElementById('game-screen');
    
    startButton.addEventListener('click', function() {
        player1Name = document.getElementById('player1').value;
        player2Name = document.getElementById('player2').value;
        
        if (player1Name && player2Name) {
            initialScreen.style.display = 'none';
            gameScreen.style.display = 'block';
            document.getElementById('players').textContent = `Jogador 1: ${player1Name} vs Jogador 2: ${player2Name}`;
            atualizaMostrador();
            inicializaEspaco();
        } else {
            alert('Por favor, insira o nome de ambos os jogadores.');
        }
    });
    
    resetButton.addEventListener('click', function() {
        final = false;
        currentPlayer = player1Symbol;
        document.querySelectorAll('.espaco').forEach(espaco => {
            espaco.innerHTML = "";
            espaco.setAttribute("jogada", "");
        });
        atualizaMostrador();
    });
});