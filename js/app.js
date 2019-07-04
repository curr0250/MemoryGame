//create list of cards

let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o', 
             'fa-anchor', 'fa-anchor', 
             'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-anchor', 'fa-anchor',
            'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
            ];

//create the HTML element for each card

function createCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createGame() {
    let deck = document.querySelector('.deck');
    let cardHTML= shuffle(cards).map(function(card) {
        return createCard(card);
    });
    deck.innerHTML = cardHTML.join('');
   
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


//set up variables to play game
let deckOfCards = document.querySelectorAll('.card');
let shownCards = [];
let matchedPairs = [];
let win = false;
let moves = 0;
let showMoves = document.querySelector('.moves');

//keeps track of and displays number of moves
function keepCount() {
    moves += 1;
    showMoves.textContent = `Moves: ${moves}`;
}

//add event listener to cards
deckOfCards.forEach(function (card) {
    card.addEventListener('click', (function (ev) {
        if ((!card.classList.contains('show')) && shownCards.length < 2) {
            shownCards.push(card);
            showCards(card);
        }
          
        
            if (shownCards.length % 2 === 0) {
                hideCards(card);
            }
    }
    ));
});

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
    }, 1500);
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
        };
        
    }else{
        hideCards(card);
    }
};

let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let fireModal = document.querySelector(".trigger");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

fireModal.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);


function winGame() {
    fireModal.click();
    
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
