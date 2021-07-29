/* 
TO DO:
- True eraser
- Modern mode must change cell color when outside the grid and back to the same cell
- Borders must reset the actual hovered cell
*/

// Creates default 16x16 blank cells grid
let gridContainer = document.getElementsByClassName("gridContainer")[0];

for (let i = 0; i < 256; i++) {
    let div = document.createElement('div');
    div.classList.add(i);
    div.classList.add("cell");
    gridContainer.appendChild(div);
}

// Adds event listeners to every cell
let cells = document.getElementsByClassName("cell");
for (let cell of cells) {
    cell.addEventListener("mousemove", mouseHover)
}

//  TO DO: Grid border will reset the actual hovered cell
border = document.getElementsByClassName("gridContainer");

// TO DO
// border = border.addEventListener("mousemove", resetActualCell);

// Starts with classic (blackCell) mode by default
let mode = 'blackCell'

// Rainbow mode: default start in 0 (red)
let rainbowSequence = 0;

// Global variable for actual hovered cell
let actualCell = "";

// Prepare buttons with listeners to change mode/reset
resetButton = document.getElementById("resetButton");
resetButton = resetButton.addEventListener("click", resetGrid);

classicButton = document.getElementById("classicButton");
classicButton = classicButton.addEventListener("click", () => mode = 'blackCell');

eraserButton = document.getElementById("eraserButton");
eraserButton = eraserButton.addEventListener("click", () => mode = 'whiteCell');

modernButton = document.getElementById("modernButton");
modernButton = modernButton.addEventListener("click", () => mode = 'modernCell');

rainbowButton = document.getElementById("rainbowButton");
rainbowButton = rainbowButton.addEventListener("click", () => mode = 'rainbowCell');

// If mouse hovers a cell, add new class depending the selected mode
function mouseHover(e) {
    e.preventDefault();
    let cellClases = e.target.classList;
    if (cellClases[0] != actualCell) {
        let currentClass = cellClases[2];
        if (!currentClass) {
            if (mode == 'rainbowCell') {
                cellClases.add(`rainbowCell${rainbowSequence}`);
                rainbowSequence++;
            } else if (mode == 'modernCell') {
                cellClases.add("modernCell0");
            } else {
                cellClases.add(mode);
            }
        } else {
            if (mode == 'rainbowCell') {
                cellClases.replace(currentClass, `rainbowCell${rainbowSequence}`);
                rainbowSequence++;
            } else { 
                
                // Takes out numbers from cell's class. ie: modernCell3
                let currentClassChecker = currentClass.replace(/[0-9]/g, '');

                if (mode != currentClassChecker) {
                    if (mode == 'modernCell') {
                        cellClases.replace(currentClass, "modernCell0");
                    } else {
                        cellClases.replace(currentClass, mode);
                    }
                } else if (mode == 'modernCell') {
                    let number = parseInt(currentClass[10]);
                    if (number < 9) {
                        number += 1;
                        cellClases.replace(currentClass, `modernCell${number}`);
                    }
                }
            }
        }
    }
    if (rainbowSequence >= 7){
        rainbowSequence = 0;
    }
    actualCell = cellClases[0];
}

// Reset the grid
function resetGrid() {

    // User inputs new grid size between 1-100
    do {
        userInput = prompt("How many cells do you want? (Between 1 to 100)");
    } while (userInput <= 0 || userInput > 100 || !(userInput == Math.floor(userInput)));
    
    // Removes all children of the container 
    gridContainer.replaceChildren();

    // Adds children according to user input
    for (let i = 0; i < userInput * userInput; i++) {
        let div = document.createElement('div');
        div.classList.add(i);
        div.classList.add("cell");
        gridContainer.appendChild(div);
    }
    
    // The cell auto-sizes according user input
    gridContainer.style.cssText = `grid-template-columns: repeat(${userInput}, ${480 / userInput}px);
                                   grid-template-rows: repeat(${userInput}, ${480 / userInput}px)`;
    
    // Adds event listeners when the mouse hovers a cell
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.addEventListener("mousemove", mouseHover)
    }
}   