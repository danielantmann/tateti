let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; // Representa el estado del tablero
const table = document.getElementById('myTable');
let nodoH3 = document.createElement("h3");


function makeMove(cell) {
    const index = cell.getAttribute('name') - 1; // Obtener el índice de la celda
    if (cell.innerHTML === '' && board[index] === '') {
        const img = document.createElement('img');
        img.src = currentPlayer === 'X' ? "../img/borrar.png" : '../img/circunferencia.png'; // Cambia las rutas a tus imágenes
        img.style.width = '80px'; // Ajusta el tamaño de la imagen
        img.style.height = '80px'; // Ajusta el tamaño de la imagen
        cell.appendChild(img); // Insertar la imagen en la celda

        board[index] = currentPlayer; // Actualizar el estado del tablero
        if (verifyWinner()) {
        nodoH3.innerHTML = currentPlayer + ' ha ganado!';
        table.insertAdjacentElement('afterend',nodoH3);
            
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

function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Reiniciar el estado del tablero
    currentPlayer = 'X'; // Reiniciar el jugador actual
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.innerHTML = ''); // Limpiar el tablero visualmente
    nodoH3.remove();
}