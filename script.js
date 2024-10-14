const container = document.getElementById('grid-container');
const button = document.getElementById('resize-button');

// Function to generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to progressively darken the square by reducing its brightness
function darkenSquare(square) {
    let currentBrightness = square.dataset.brightness ? parseFloat(square.dataset.brightness) : 1;
    currentBrightness -= 0.1; // Decrease brightness by 10%
    if (currentBrightness < 0) currentBrightness = 0;
    square.dataset.brightness = currentBrightness;
    square.style.filter = `brightness(${currentBrightness})`;
}

// Function to create the grid with randomized colors and darkening effect
function createGrid(squaresPerSide) {
    container.innerHTML = ''; // Clear the existing grid
    const squareSize = 960 / squaresPerSide;

    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.flexBasis = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Assign a random color to the square
        square.style.backgroundColor = getRandomColor();
        square.dataset.brightness = 1; // Track brightness level (1 means 100% brightness)

        // Add hover effect to progressively darken the square
        square.addEventListener('mouseover', () => {
            darkenSquare(square);
        });

        container.appendChild(square);
    }
}

button.addEventListener('click', () => {
    let squaresPerSide = prompt('Enter the number of squares per side (maximum 100):');
    squaresPerSide = parseInt(squaresPerSide);

    if (squaresPerSide > 0 && squaresPerSide <= 100) {
        createGrid(squaresPerSide);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
});

// Initialize grid with 16x16 squares
createGrid(50);
