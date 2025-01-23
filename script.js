let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; 
const table = document.getElementById('myTable');
let div = document.createElement('div');
let imgGanador = document.createElement('img');
let nodoH3 = document.createElement("h3");
nodoH3.className ="silkscreen-regular";


function makeMove(cell) {
    const index = cell.getAttribute('name') - 1; // Obtener el índice de la celda
    if (cell.innerHTML === '' && board[index] === '') {
        const img = document.createElement('img');
        img.src = currentPlayer === 'X' ? "../img/borrar.png" : '../img/circunferencia.png'; 
        img.style.width = '80px'; 
        img.style.height = '80px';
        cell.appendChild(img); // Insertar la imagen en la celda
        board[index] = currentPlayer; // Actualizar el estado del tablero
        if (verifyWinner()) {
        imgGanador.src = currentPlayer === 'X' ? "../img/borrar.png" : '../img/circunferencia.png';
        imgGanador.style.width = '80px'; 
        imgGanador.style.height = '80px'; 
        imgGanador.style.marginLeft = '25px';
        nodoH3.innerHTML = ' ha ganado!';
        div.appendChild(imgGanador);
        div.appendChild(nodoH3);
        table.insertAdjacentElement('afterend',div);
        disableCells(); // Llamar a la función para deshabilitar las celdas  
        } else if (board.every(cell => cell !== '')) { // Verificar si hay un empate
            nodoH3.innerHTML = '¡Empate!';
            div.appendChild(nodoH3);
            table.insertAdjacentElement('afterend', div);
            disableCells(); // Deshabilitar las celdas
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function verifyWinner() {
    const winningCombinations = [
        [0, 1, 2], // Fila 1
        [3, 4, 5], // Fila 2
        [6, 7, 8], // Fila 3
        [0, 3, 6], // Columna 1
        [1, 4, 7], // Columna 2
        [2, 5, 8], // Columna 3
        [0, 4, 8], // Diagonal \
        [2, 4, 6]  // Diagonal /
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true; // Hay un ganador
        }
    }
    return false; // No hay ganador
}

function disableCells() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.classList.add('disabled'); // Agregar la clase 'disabled' a cada celda
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Reiniciar el estado del tablero
    currentPlayer = 'X'; // Reiniciar el jugador actual
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.innerHTML = ''); // Limpiar el tablero visualmente
    nodoH3.remove();
}