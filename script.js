// List of icons for matching cards
const cardIcons = [
    '🍎', '🍎', '🍌', '🍌', 
    '🍇', '🍇', '🍒', '🍒', 
    '🍉', '🍉', '🍓', '🍓', 
    '🍍', '🍍', '🥭', '🥭'
];

let attempts = 0;
let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let timer = 0;
let timerInterval;

// Shuffle the cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = timer;
    }, 1000);
}

// Create game board
function createBoard() {
    const board = document.getElementById('game-board');
    const shuffledCards = shuffle(cardIcons);

    shuffledCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList = 'card w-24 h-32 relative bg-transparent rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105';
        card.dataset.icon = icon;
        card.dataset.index = index;

        // Card front and back
        card.innerHTML = `
          <div class="card-front absolute inset-0 bg-indigo-600 text-white flex justify-center items-center text-4xl font-bold rounded-lg">
            ?
          </div>
          <div class="card-back absolute inset-0 bg-white text-4xl flex justify-center items-center rounded-lg shadow-md">
            ${icon}
          </div>
        `;

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    attempts++;
    document.getElementById('attempts').innerText = attempts;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        disableCards();
        matches++;
        if (matches === cardIcons.length / 2) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`You won in ${attempts} attempts and ${timer} seconds!`), 500);
        }
    } else {
        setTimeout(unflipCards, 1000);
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
}

// Reset board logic
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart the game
function restartGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    attempts = 0;
    matches = 0;
    timer = 0;
    clearInterval(timerInterval);
    document.getElementById('attempts').innerText = attempts;
    document.getElementById('timer').innerText = timer;
    createBoard();
    startTimer();
}

// Initialize game on load
window.onload = () => {
    createBoard();
    startTimer();
};
