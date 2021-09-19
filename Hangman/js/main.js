// Step One: Have an array that holds words to pick from
const arrOfWords = ['hearts', 'diamonds', 'spades', 'clubs', 'cherry', 'cantaloupe', 'watermelon', 'peach', 'pear', 'grape', 'apple', 'dragonfruit', 'orange'];


// Step Two: Loop through array to select random word and display on screen.
const wordContainer = document.getElementById('word');
let randomArrayItem = Math.floor(Math.random() * arrOfWords.length);



// Step Three: Turn Word into an Array
const currentWord = arrOfWords[randomArrayItem];
const arrOfCurrentWord = [...currentWord];

for (let i = 0; i < arrOfCurrentWord.length; i++) {
    wordContainer.innerHTML += `<span class="hidden-letter">—</span>`;
}

console.log(arrOfCurrentWord);



// Step Four: Understand What Letter Button Is Being Pressed
const buttons = document.querySelectorAll('.letter');
let letter = '';

buttons.forEach(button => {
    button.addEventListener('click', e => { // e is needed for a callback function. This is the actual event? So you can do e.target to reference the thing clicked on (uhhhh)
        letter = e.target.innerHTML;
        pickALetter(letter.toLowerCase(), arrOfCurrentWord);
        addToFailCount();
        isGameWon();
        shouldGameEnd();
    });
});


// I think Step 6 needs to run before Step 5 actually
// Step 6: Raise Fail Count
    // For the life of me, I couldn't figure out the fail condition stuff in a nicer way :(
let letterExisted = false;
let failCount = 0;
let failCountContainer = document.getElementById('fail-count');

function addToFailCount() {
    if (letterExisted) {
        letterExisted = false;
    } else {
        failCount++;
        failCountContainer.innerHTML += `<span class="fail-symbol">X</span>`;
        
    }
}

function shouldGameEnd() {
    if (failCount === 5) {
        gameOver();
    }

    if (isGameWon()) {
        gameWon();
    }
}



// Step Five: Is the button I clicked a letter in the array of letters
function pickALetter(letter, arrOfCurrentWord) {
    const arrOfHiddenLetters = document.querySelectorAll('.hidden-letter');
    
    for (let i = 0; i < arrOfCurrentWord.length; i++) {
        if (letter === arrOfCurrentWord[i]) {
            arrOfHiddenLetters[i].innerHTML = arrOfCurrentWord[i];
            letterExisted = true;
            document.querySelector('[name="' + letter + '"]').disabled = true;
        } else {
            document.querySelector('[name="' + letter + '"]').disabled = true;
        }
    }
}

// Step Seven: Game Over - Failed
function gameOver() {
    const lettersContainer = document.querySelector('.letter-buttons-container');
    const topLettersContainer = document.getElementById('letters-container');

    lettersContainer.classList.add("d-none");
    topLettersContainer.innerHTML += `<span class="game-over-text">Game Over :(</span>`;

}

// Step Eight: Is Game Won?
function isGameWon() {
    const arrOfHiddenLetters = document.querySelectorAll('.hidden-letter');
    let gameIsWon = true;
    
    for (let i = 0; i < arrOfHiddenLetters.length; i++) {
        if (arrOfHiddenLetters[i].innerHTML === '—') {
            gameIsWon = false;
            break;
        }
    }

    return gameIsWon;
}

// Step Nine: Game Over - Won
function gameWon() {
    const lettersContainer = document.querySelector('.letter-buttons-container');
    const topLettersContainer = document.getElementById('letters-container');

    lettersContainer.classList.add("d-none");
    topLettersContainer.innerHTML += `<span class="game-won-text">Game Won \<3</span>`;
}

// Step Ten: Reset Game
    // I should really have a reset button... but I'm sleepy