
const board = document.getElementById("board");
const piecesContainer = document.getElementById("pieces");

let positions = [];
let correctPositions = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createPuzzle(image) {
    for (let i = 0; i < 9; i++) {
        let x = (i % 3) * -200;
        let y = Math.floor(i / 3) * -200;
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = `url('${image}')`;
        piece.style.backgroundPosition = `${x}px ${y}px`;
        piece.draggable = true;
        piece.id = `piece-${i}`;
        piece.dataset.index = i;
        
        piece.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", e.target.id);
        });
        
        positions.push(piece);
        correctPositions[i] = i;
    }
    shuffle(positions).forEach(p => piecesContainer.appendChild(p));
}

board.addEventListener("dragover", (e) => e.preventDefault());
board.addEventListener("drop", (e) => {
    let pieceId = e.dataTransfer.getData("text");
    let piece = document.getElementById(pieceId);
    if (!e.target.hasChildNodes() && e.target.classList.contains("dropzone")) {
        e.target.appendChild(piece);
        checkWin();
    }
});

function checkWin() {
    let placedPieces = [...board.children];
    let isCompleted = placedPieces.every((piece, index) => parseInt(piece.dataset.index) === index);
    if (isCompleted) {
        alert("¡Puzzle completado!");
    }
}

// Crear zonas de drop en el tablero
for (let i = 0; i < 9; i++) {
    let dropZone = document.createElement("div");
    dropZone.classList.add("piece", "dropzone");
    board.appendChild(dropZone);
}

function restart() {
    positions = [];
    correctPositions = [];
    for (let i = 0; i < 9; i++) {
        let dropZone = document.createElement("div");
        dropZone.classList.add("piece", "dropzone");
        board.target.removeChild(dropZone);
    }
    createPuzzle("img/ -4.jpg");
}

createPuzzle("img/ -4.jpg"); // Reemplaza con tu imagen