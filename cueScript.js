function loadCues() {
    document.body.style.color = "black";
}

function nextCard(deltaOne, k) {
    if ((activeCard == 0 && deltaOne == -1) || (activeCard == cardCount && deltaOne == 1)){
        return
    }
    if (k == 39 || k == 37) {
        document.getElementById("cardContent").innerHTML = items[activeCard + deltaOne];
        activeCard += deltaOne;
        random = 0;
        updateStatus();
    } else {
        random == 0 ? random++ : random -= 1;
        document.getElementById("cardContent").innerHTML = table[random][activeCard];
    }
    
}

function updateStatus() {
    document.getElementById("statusText").innerHTML = "Card " + (activeCard + 1) 
        + " of " + (cardCount + 1);
    document.getElementById("cardContent").innerHTML = items[activeCard];
}

function changeCard(key) {
    var k = key.keyCode;
    switch (k){
        case 39:
            nextCard(1, k);
            break;
        case 37:
            nextCard(-1, k);
            break;
        case 40:
            nextCard(0, k);
            break;
        case 38:
            nextCard(0, k);
            break;
    }
}

let fr = new FileReader();
let deck = "";

function deckUpload (deck) {
    fr.readAsText(deck.target.files[0]);
    fr.onload = e => {
        rawDeck = e.target.result;
        var deckCards = rawDeck.split("✑");
        var deckSolutions = [];
        let i = 1;
        for (n = 0; n < 0.5 * deckCards.length; n++) {
            deckSolutions[n] = deckCards[i];
            i += 2;
        }
        i = 0;
        let startSize = deckCards.length;
        for (x = 1; x < 0.5 * startSize + 1; x++){
            deckCards.splice(x, 1);
        }
        items = deckCards;
        solutions = deckSolutions;
        activeCard = 0;
        cardCount = items.length - 1;
        random = 0;
        table = [items, solutions];
        updateStatus();
        document.getElementById("shuffle").addEventListener("click", randomize);
    }
}

function randomize() {
    shuffle(table);
    updateStatus();
}

// https://github.com/Daplie/knuth-shuffle/
function shuffle(array) {
    var currentIndex = array[0].length
      , temporaryValue
      , temporaryValue2
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[0][currentIndex];
      temporaryValue2 = array[1][currentIndex];
      array[0][currentIndex] = array[0][randomIndex];
      array[1][currentIndex] = array[1][randomIndex];
      array[0][randomIndex] = temporaryValue;
      array[1][randomIndex] = temporaryValue2;
    }
}

document.addEventListener("keydown", changeCard);
document.getElementById("deck").addEventListener("change", deckUpload);
document.getElementById("cardContent").innerHTML = "CueStudy";