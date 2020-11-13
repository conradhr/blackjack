var cardTally = 3;
var dealerScore = 0;
var playerScore = 0;
var hasWon = false;

function Card() {
    this.cardNum = randomInteger(1, 13);
    this.cardSet = randomInteger(0, 3);
}

function deal() {
    console.log(playerScore);
    console.log(dealerScore);
    setCards();
    updateScore();
    updateScore();
    console.log(playerScore);
    console.log(dealerScore);
    //
}

function requestPlayerCard() {
    var card = new Card();
    var bool = true;

    while (bool) {
        var playerHandList = document.getElementById("playerHand").children;
        for (var i = 0; i < playerHandList.length; i++) {
            if (card.cardNum == playerHandList[i].getAttribute("data-cardNum") && card.cardSet == playerHandList[i].getAttribute("data-cardSet")) {
                card = new Card();
            }
        }
        bool = false;
    }

    var playerHand = document.getElementById("playerHand");
    var currentCard = document.createElement("img");

    var fileName = getCardFile(card);
    var cardValue = getCardValue(card);

    currentCard.setAttribute("id", "player" + cardTally); //Creates new ID for card
    currentCard.setAttribute("src", "img/" + fileName + ".png");
    currentCard.setAttribute("width", "107");
    currentCard.setAttribute("height", "98");
    currentCard.setAttribute("data-value", cardValue);
    currentCard.setAttribute("data-cardNum", card.cardNum);
    currentCard.setAttribute("data-cardSet", card.cardSet);

    playerScore = playerScore + cardValue;
    playerHand.appendChild(currentCard);
    cardTally++;
    updateScore();

}


function completeDealerHand() {
    disableButtons();

    var dealerCard = 3;
    var bool = true;
    var dealerHand = document.getElementById("dealerHand");

    dealerScore = dealerScore + Number(document.getElementById("dealer2").getAttribute("data-value"));
    updateScore();

    var card = new Card();
    while (bool) {
        var dealerHandList = dealerHand.children;
        for (var i = 0; i < dealerHandList.length; i++) {
            if (card.cardNum == dealerHandList[i].getAttribute("data-cardNum") && card.cardSet == dealerHandList[i].getAttribute("data-cardSet")) {
                card = new Card();
            }
        }
        bool = false;
    }

    while (dealerScore <= 16) {
        var newElement = document.createElement("img");
        var cardValue = getCardValue(card);

        newElement.setAttribute("id", "dealer" + dealerCard); //Creates new ID for card
        newElement.setAttribute("src", "img/back.png");
        newElement.setAttribute("width", "107");
        newElement.setAttribute("height", "98");
        newElement.setAttribute("data-value", cardValue);
        newElement.setAttribute("data-cardNum", card.cardNum);
        newElement.setAttribute("data-cardSet", card.cardSet);

        dealerScore = dealerScore + cardValue;
        dealerHand.appendChild(newElement);
        dealerCard++;
    }


    for (var i = 1; i < dealerHand.children.length; i++) {
        var cardSet = parseInt(dealerHand.children[i].getAttribute("data-cardSet"), 10);
        var cardNum = parseInt(dealerHand.children[i].getAttribute("data-cardNum"), 10);
        var fileName = (13 * cardSet) + cardNum;
        console.log(cardSet);
        console.log(cardNum);
        console.log(fileName);
        dealerHand.children[i].setAttribute("src", "img/" + fileName + ".png");
    }
    updateScore();
    if (playerScore > dealerScore) {
        hasWon = true;
        updateScore();
        disableButtons();
    }

    if (dealerScore > playerScore) {
        var player = document.getElementById("playerScore");
        player.innerHTML += " Player has lost the hand! ";
        disableButtons();
    }
}

function updateScore() {
    var player = document.getElementById("playerScore");
    var dealer = document.getElementById("dealerScore");
    var mark = document.createElement("mark");

    player.innerHTML = playerScore;
    dealer.innerHTML = dealerScore;

    if (playerScore == 21 || dealerScore > 21) {
        hasWon = true;
    }
    
    if (hasWon) {
        player.appendChild(mark);
        var styleStr = "background-color:#4CAF50;";
        mark.setAttribute("style", styleStr);
        mark.innerHTML += " Player has won the hand! ";
        disableButtons();

    } else if (playerScore > 21 || dealerScore == 21) {
        player.innerHTML += " Player has lost the hand! ";
        disableButtons();
    }
}

function disableButtons() {
    var draw = document.getElementById("btnDraw");
    var hold = document.getElementById("btnHold");

    draw.disabled = true;
    hold.disabled = true;
}

function getCardFile(Card) {
    return (13 * Card.cardSet + Card.cardNum);
}

function getCardValue(Card) {
    if (Card.cardNum == 1) {
        return 11;
    } else if (Card.cardNum > 10) {
        return 10;
    } else {
        return Card.cardNum;
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setCards() {
    var playerHandList = document.getElementById("playerHand");
    var dealerHandList = document.getElementById("dealerHand");
    var bool = true;
    var first = true;

    for (var i = 1; i <= 2; i++) {
        var currentCard = new Card();
        if (i == 2) {
            while (bool) {
                if (currentCard.cardNum == playerHandList.children[i - 2].getAttribute("data-cardNum") &&
                        currentCard.cardSet == playerHandList.children[i - 2].getAttribute("data-cardSet")) {
                    currentCard = new Card();
                }
                bool = false;
            }

        }

        var fileName = getCardFile(currentCard);
        var cardValue = getCardValue(currentCard);

        playerHandList.children[i - 1].setAttribute("id", "player" + i); //Creates new ID for card
        playerHandList.children[i - 1].setAttribute("src", "img/" + fileName + ".png");
        playerHandList.children[i - 1].setAttribute("width", "107");
        playerHandList.children[i - 1].setAttribute("height", "98");
        playerHandList.children[i - 1].setAttribute("data-value", cardValue);
        playerHandList.children[i - 1].setAttribute("data-cardSet", Card.cardSet);
        playerHandList.children[i - 1].setAttribute("data-cardNum", Card.cardNum);

        playerScore = playerScore + cardValue;
    }

    for (var i = 1; i <= 2; i++) {
        var currentCard = new Card();
        if (i == 2) {
            while (bool) {
                if (currentCard.cardNum == dealerHandList.children[i - 2].getAttribute("data-cardNum") &&
                        currentCard.cardSet == dealerHandList.children[i - 2].getAttribute("data-cardSet")) {
                    currentCard = new Card();
                }
                bool = false;
            }
            var dealerHand = document.getElementById("dealerHand");
            var newElement = document.createElement("img");

            var cardValue = getCardValue(currentCard);

            newElement.setAttribute("id", "dealer" + i); //Creates new ID for card
            newElement.setAttribute("src", "img/back.png");
            newElement.setAttribute("width", "107");
            newElement.setAttribute("height", "98");
            newElement.setAttribute("data-value", cardValue);
            newElement.setAttribute("data-cardNum", currentCard.cardNum);
            newElement.setAttribute("data-cardSet", currentCard.cardSet);

            dealerHand.appendChild(newElement);
            continue;
        }

        var fileName = getCardFile(currentCard);
        var cardValue = getCardValue(currentCard);

        dealerHandList.children[i - 1].setAttribute("id", "dealer" + i); //Creates new ID for card
        dealerHandList.children[i - 1].setAttribute("src", "img/" + fileName + ".png");
        dealerHandList.children[i - 1].setAttribute("width", "107");
        dealerHandList.children[i - 1].setAttribute("height", "98");
        dealerHandList.children[i - 1].setAttribute("data-value", cardValue);
        dealerHandList.children[i - 1].setAttribute("data-cardSet", Card.cardSet);
        dealerHandList.children[i - 1].setAttribute("data-cardNum", Card.cardNum);

        dealerScore = dealerScore + cardValue;
    }
}
