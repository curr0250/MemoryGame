//create list of cards
let cards = ['fa-diamond', 'fa-diamond',
            'fa-bomb', 'fa-bomb',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-automobile', 'fa-automobile',
            'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
            ];


//create the HTML element for each card
function createCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};


let totalSec = 0;
let timeUsed = setInterval(countTimer, 1000);
let deck = document.querySelector('.deck');


//create cards and prepare the game to be played
function createGame() {
    let cardHTML = shuffle(cards).map(function (card) {
        return createCard(card);
    });
    deck.innerHTML = cardHTML.join('');
    countTimer();
    startGame();
}
createGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//tracks number of moves
let moves = 0;
let showMoves = document.querySelector('.moves');

function keepCount() {
    moves++;
    showMoves.textContent = `Moves: ${moves}`;
    setStars(moves);
}


//tracks stars
let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let numStars = 3;

function setStars(moves) {


    if (moves == 15) {
        star1.classList.add('close');
        numStars--;
    }

    if (moves == 20) {
        star2.classList.add('close');
        numStars--;
    }

    if (moves == 25) {
        star3.classList.add('close');
        numStars--;
    }
};


//tracks and display time
function countTimer() {
    totalSec++;
    let hour = Math.floor(totalSec / 3600);
    let min = Math.floor((totalSec - hour * 3600) / 60);
    let sec = totalSec - (hour * 3600 + min * 60);
    document.querySelector(".timer").innerHTML = min + ":" + sec;
};


//stop time
function stopTime() {
   clearInterval(timeUsed);
};


//begin the game
let deckOfCards = document.querySelectorAll('.card');
let shownCards = [];
let matchedPairs = [];
let win = false;

function startGame() {
    deck.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName == "LI" && (!e.target.classList.contains('show')) && shownCards.length < 2) {
            shownCards.push(e.target);
            showCards(e.target);
        }
        if (shownCards.length % 2 === 0) {
            hideCards();
        }
    });
};


//flip selected cards over
function showCards(card) {
    card.classList.add('open', 'show');
    if (shownCards.length == 2) {
        checkMatch(card);
        keepCount();
    }
};


//hide cards after period of time
function hideCards(card) {
    setTimeout(function () {
        shownCards.forEach(function (card) {
            card.classList.remove('open', 'show');
        });
        shownCards = [];
    }, 1000);
};


//check to see if cards match
function checkMatch(card) {
    if (shownCards[0].dataset.card == shownCards[1].dataset.card) {
        shownCards[0].classList.add('match');
        shownCards[0].classList.remove('open');
        shownCards[0].classList.remove('show');

        shownCards[1].classList.add('match');
        shownCards[1].classList.remove('open');
        shownCards[1].classList.remove('show');

        shownCards = [];
        matchedPairs += 1;
        if (matchedPairs.length == 8) {
            win = true;
            winGame();
            stopTime();
        };

    } else {
        hideCards(card);
    }
};

//modal
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let fireModal = document.querySelector(".trigger");
let yes = document.querySelector(".yes");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

fireModal.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
yes.addEventListener("click", function () {
    resetGame();
    toggleModal();
});

let finalTime = document.querySelector(".finalTime");
let finalStars = document.querySelector(".finalStars");

//display results in modal
function winGame() {
    if (win = yes) {
        finalStars.textContent = `You earned ${numStars} STARS!`;
        finalTime.textContent = `Your time was ${totalSec} seconds`;
    }
    fireModal.click();

};

//reset Game
let reset = document.querySelector(".restart");
reset.addEventListener("click", resetGame);

function resetGame() {
    totalSec = 0;
    moves = 0;
    showMoves.textContent = `Moves: ${moves}`;
    createGame();
    let timeUsed = setInterval(countTimer, 1000);
    star1.classList.remove('close');
    star2.classList.remove('close');
    star3.classList.remove('close');
    numStars = 3;
    shownCards = [];
    matchedPairs = 0;
    win = false;
};
