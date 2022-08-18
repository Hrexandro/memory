/*
TO DO:

ensure it is always sideways on mobile
add soud effects - characters saying their catchphrases - meh


more themes:

Captain Claw
Peppa Pig


*/
let themeArray = [];
const themes = (function() {

    function themeMaker(name, ...characters) {
        let theme = Object.create(themeMaker.proto);
        theme.name = name;
        theme.characters = characters;
        console.log(theme.characters)
        return theme;
    }

    themeMaker.proto = {
            getName: function() {
                return this.name;
            },
        }

    let PawPatrol = themeMaker("Paw Patrol", "chase", "skye", "marshall", "rocky", "zuma", "rubble");
    themeArray.push(PawPatrol);
    let MyLittlePony = themeMaker("My Little Pony", "applejack", "fluttershy", "pinkiepie", "rainbowdash", "rarity", "twilightsparkle");
    themeArray.push(MyLittlePony);
    let ScoobyDoo = themeMaker("Scooby Doo", "scoobydoo", "scrappy", "shaggy", "fred", "velma", "daphne");
    themeArray.push(ScoobyDoo);
    return {
        PawPatrol,
        MyLittlePony,
        ScoobyDoo,

    }
})();
let pickedTheme = undefined;
const frontPage = document.getElementById("central-area").innerHTML;
let themeList = document.getElementsByClassName("theme-button");


function ensureEventBubbling(situation) { //
    console.log('ensure event bubbling runs')
    if (situation.target.getAttribute('class') === "card" || situation.target.getAttribute('class') === "logo") { //if the picture is clicked, bubble to the button
        return situation.target.parentNode;
    } else if (situation.target.getAttribute('class') === "card-content") {
        return situation.target.parentNode.parentNode;
    } else if (situation.target.classList.contains("card-container") || situation.target.classList.contains("theme-button")){//to not bubble to random crap if sb clicks an image
        console.log(situation.target)
        return situation.target;
    }
}


function addThemeListClickability(){
    for (i = 0; i < themeList.length; i++) {
        themeList[i].addEventListener('click', (e) => {
            let pickedButtonId = ensureEventBubbling(e).id
            pickedTheme = themeArray.find(compareThemeObjectNameWithPickedButtonId);

            function compareThemeObjectNameWithPickedButtonId(obj){
                return obj.name === pickedButtonId;
            }
            removeThemeButtons();
    
            populateGame(pickedTheme.name);
        })
    }

}
addThemeListClickability();


let firstClickedCard = null;
let secondClickedCard = null;
let transitions = 0; //to stop transitionend firing too quickly, keeps track of the two running consecutively
let cards = null;
const centralArea = document.getElementById("central-area");

function populateGame(theme) {
    function countInArray(array, what) {
        return array.filter(item => item == what).length;
    }

    let number = 0; //so that each card has a unique number, and clicking the same card twice does not remove it
    console.log("populate game runs")

    function createCard(name) {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add("card-container");
        cardContainer.classList.add(`${name}`);
        cardContainer.setAttribute('id', `${number}`);
        number++;
        cardContainer.innerHTML = `<button class="card"><img class="card-content card-back" src="images/${theme}/${name}.png"></button>
                                    <div class="card-content card-front"></div>`
        centralArea.appendChild(cardContainer)
    }
    console.log(`Theme is ${theme}`)
    function generateCardsBasedOnTheme(theme){
        let characters = theme.characters;
        let charactersAdded = [];

        while (charactersAdded.length < characters.length * 2) {
            random = Math.floor(Math.random() * characters.length);

            if (countInArray(charactersAdded, characters[random]) < 2) {
                charactersAdded.push(characters[random]);
                createCard(characters[random]);
            }
            console.log(charactersAdded)

        }
    }
    generateCardsBasedOnTheme(pickedTheme);
    cards = document.getElementsByClassName('card')

    let presentation = setInterval(uncover, 500);
    let presentationCounter = 0;

    function uncover() {

        if (presentationCounter >= cards.length) {
            console.log("should stop");
            setTimeout(function() {
                for (l = 0; l < cards.length; l++) {
                    cards[l].classList.toggle("uncovered");
                }

            }, 900);
            stopPresentation();
            if (document.getElementsByClassName("side-button").length===0){
                addSideButtons();// the reset button should be added after presentation
            }
            addCardClickability();

        } else {
            cards[presentationCounter].classList.toggle("uncovered");
            presentationCounter++;
        }
        
        console.log("uncover end")
        transitions = 0;
    }



    function stopPresentation() {
        clearInterval(presentation);
        console.log("stoppresentation end")
    }

}

function addSideButtons(){
    let sidePanel = document.createElement('div');
    sidePanel.setAttribute('id','side-panel')
    document.querySelector('body').appendChild(sidePanel);

    function addSideButtonSingular(text, image){
        let newButton = document.createElement('button');
        newButton.setAttribute('class','side-button');
        newButton.setAttribute('id',`${text}-button`);
        newButton.innerHTML = `<img src="${image}" class="side-icon" alt="${text} button">`
        sidePanel.appendChild(newButton);
        newButton.classList.add('side-button')
        newButton.classList.add('invisible')
        setTimeout(() => {
            newButton.classList.remove('invisible');
          }, "1000")

    }

    addSideButtonSingular("RESET","images/play-blue.png");
    addSideButtonSingular("RETURN","images/arrow-blue.png");

    let resetButton = document.getElementById("RESET-button");
    let returnButton = document.getElementById("RETURN-button");
    function hideButtons(){
        Array.from(document.getElementsByClassName('side-button')).forEach((item)=>{
            item.classList.add('invisible')
        })
    }
    resetButton.addEventListener('click',()=>{
        resetGame();
        
        for (l = 0; l < cards.length; l++) {
            cards[l].classList.remove("uncovered");
        }
    })
    returnButton.addEventListener('click',()=>{
        hideButtons()
        setTimeout(() => {
            removeSideButtons();
            document.getElementById("central-area").innerHTML = frontPage;
            pickedTheme = undefined;
            addThemeListClickability();
        }, "1200")
    })
}

function removeSideButtons(){
    document.getElementById('side-panel').remove();
}

function addCardClickability() {

    for (j = 0; j < cards.length; j++) {
        cards[j].addEventListener('click', (e) => {
            if (firstClickedCard === null) {
                firstClickedCard = ensureEventBubbling(e);
                firstClickedCard.querySelector('.card').classList.toggle("clicked");
            } else if (secondClickedCard === null && ensureEventBubbling(e).getAttribute('class') !== "card-content card-back") { //the second one ensures the same card is not used twice
                secondClickedCard = ensureEventBubbling(e);
                secondClickedCard.querySelector('.card').classList.toggle("clicked");
            }
        })
        cards[j].addEventListener('transitionend', () => {
            transitions++ //ensure both ends are fired
            console.log("transitionend")
            console.log(`transitons: ${transitions}`)

            if (secondClickedCard !== null && transitions > 1) { //if the second card has been clicked and assigned to variable
                    setTimeout(function() { //don't do that too fast
                        if (firstClickedCard.getAttribute('class') === secondClickedCard.getAttribute('class')) {
                            firstClickedCard.querySelector('.card').setAttribute('class','removed-card')
                            secondClickedCard.querySelector('.card').setAttribute('class','removed-card')
                            firstClickedCard = null;
                            secondClickedCard = null;
                            console.log("check if game is finished should run");
                            checkIfGameIsFinished();
                        } else {
    
                            firstClickedCard.querySelector('.card').classList.toggle("clicked");
                            secondClickedCard.querySelector('.card').classList.toggle("clicked");
                            firstClickedCard = null;
                            secondClickedCard = null;
                        }
                        transitions = 0;
                    }, 500);
            }
        })

    }
    console.log("addcardclickability end")
}

document.createElement('button')

function resetGame(){
    removeSideButtons();
    document.getElementById("central-area").innerHTML = "";
    populateGame(pickedTheme.name);
}


function checkIfGameIsFinished() {
    if (document.getElementsByClassName("card").length === 0) {
        resetGame();
    }
}

function removeThemeButtons() {
    let counter = themeList.length
    for (j = 0; j < counter; j++) {
        console.log(themeList);
        themeList[0].remove()
    }
}

// centralArea.addEventListener('click',()=>{//bugavoider
//     console.log('bugavoider runs')
//     if (firstClickedCard === undefined && pickedTheme === undefined) {
//         console.log("bug avoided")
//         cards.classList.remove('clicked')
//     }
// })