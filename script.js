/*
TO DO:

GET TO RESET TRANSITIONEND TO ZERO AFTER UNCOVERING ALL THE CARDS, PERHAPS PUT ANOTHER SET INTERVAL A BIT LONGER THAN THE COVERING BACK AND THE FUCKTION WPOULD JUST
RESET THE INTERVAL TOZ ERO - ok after coming back to this I don't really know what this problem is about 🤷

button to reset to theme choice

add more pictures and then randomise them each time

ensure it is always sideways on mobile
add soud effects - characters saying their catchphrases
ADD reset button
add cards appearing animations

more themes:
MLP
Captain Claw
Peppa Pig
problems:

BUG: 

clicking reset game during presentation makes it go crazy - solution - disable the button during presentation or remove it altogether

*/

const themes = (function() {

    function themeMaker(name) {
        let theme = Object.create(themeMaker.proto);
        theme.name = name;
        return theme;
    }

    themeMaker.proto = {
            getName: function() {
                return this.name;
            },
        }
        //create a script that takes the themes from the HTML theme buttons, and automatically creates a theme object
    let PawPatrol = themeMaker("Paw Patrol");
    let MyLittlePony = themeMaker("My Little Pony");
    return {
        PawPatrol,
        MyLittlePony,
        //themeList,
    }
})();
let pickedTheme;
const frontPage = document.getElementById("central-area").innerHTML;
let themeList = document.getElementsByClassName("theme-button");
//console.log(themeList[0].id)

// function iterateThrough(list, func, method){//get rid of this
//     for (i=0;i<list.length;i++){
//         console.log(list[i])
//         if (func!=null){
//             func(list[i])
//         }
//         else if (method!=null){
//             list[i].method()
//         }
//     }
// }

function ensureEventBubbling(situation) { //
    console.log("ensure bubbling runs")
        //console.log(situation)
        //console.log(situation.target)
    console.log(`situation.target.getAttribute('class') is ${(situation.target.getAttribute('class'))}`)
        //console.log(`situation.target.class is ${JSON.stringify(situation.target.class)}`)
        //console.log(`variable is ${variable}`)
    if (situation.target.getAttribute('class') === "card" || situation.target.getAttribute('class') === "logo") { //if the picture is clicked, bubble to the button
        //console.log(`situation.target.parentNode is ${situation.target.parentNode}; ${JSON.stringify(situation.target.parentNode)}`)
        //console.log(`situation.target.parentNode.getAttribute('class') is ${situation.target.parentNode.getAttribute('class')};`)
        return situation.target.parentNode;
    } else if (situation.target.getAttribute('class') === "card-content") {
        //console.log(`situation.target.parentNode.parentNode is ${JSON.stringify(situation.target.parentNode.parentNode)}`)
        return situation.target.parentNode.parentNode;
    } else {
        //console.log(`situation.target is ${JSON.stringify(situation.target)}`)
        return situation.target;
    }
    //console.log(`variable is ${variable}`)
}


function addThemeListClickability(){
    for (i = 0; i < themeList.length; i++) { //themeList=document.getElementsByClassName("theme-button");
        themeList[i].addEventListener('click', (e) => {
            //console.log(`pickedTheme is ${pickedTheme}`)
            pickedTheme = ensureEventBubbling(e).id;
            //pickedTheme=e.target.id;
            //console.log(`pickedTheme after ensure event bubbling is ${pickedTheme}`)
            removeThemeButtons();
    
            populateGame(pickedTheme);
        })
    }

}
addThemeListClickability();
// iterateThrough(themeList,null,addEventListener('click',(e)=>{
//     console.log(`pickedTheme is ${pickedTheme}`)
//     pickedTheme=ensureEventBubbling(e).id;
//     console.log(`pickedTheme after ensure event bubbling is ${pickedTheme}`)
//     removeThemeButtons(); 

//     populateGame(pickedTheme);
// }))

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
        // let card = document.createElement('button');//no flip - worked at least
        // card.classList.add("card")
        // card.classList.add(`${name}`)
        // card.innerHTML = `<img class="card-content" src="images/${theme}/${name}.png">`
        // centralArea.appendChild(card)

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
    if (theme === "Paw Patrol") {
        let characters = ["chase", "skye", "marshall", "rocky", "zuma", "rubble"];
        let charactersAdded = [];
        //let num = 0;

        while (charactersAdded.length < characters.length * 2) {//put this in a function and use in all ifs
            random = Math.floor(Math.random() * characters.length);

            if (countInArray(charactersAdded, characters[random]) < 2) {
                charactersAdded.push(characters[random]);
                createCard(characters[random]);
            }
            console.log(charactersAdded)

        }
    }
    else if (theme === "My Little Pony"){
        let characters = ["applejack", "fluttershy", "pinkiepie", "rainbowdash", "rarity", "twilightsparkle"];
        let charactersAdded = [];

        while (charactersAdded.length < characters.length * 2) {//put this in a function and use in all ifs
            random = Math.floor(Math.random() * characters.length);

            if (countInArray(charactersAdded, characters[random]) < 2) {
                charactersAdded.push(characters[random]);
                createCard(characters[random]);
            }
            console.log(charactersAdded)

        }
    }
    cards = document.getElementsByClassName('card')

    let presentation = setInterval(uncover, 500);
    let presentationCounter = 0;

    function uncover() {
        // console.log("TEST");
        // console.log(presentationCounter > cards.length)
        if (presentationCounter >= cards.length) {
            console.log("should stop");
            setTimeout(function() {
                for (l = 0; l < cards.length; l++) {
                    cards[l].classList.toggle("uncovered");
                }

            }, 900);
            stopPresentation();
            if (document.getElementsByClassName("side-button").length===0){
                addSideButtons();// the reset button should be added after presentation, with a cool appearance animation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

function addSideButtons(){//finish this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let sidePanel = document.createElement('div');
    sidePanel.setAttribute('id','side-panel')
    document.querySelector('body').appendChild(sidePanel);

    function addSideButtonSingular(text, image){
        let newButton = document.createElement('button');
        newButton.setAttribute('class','side-button');
        newButton.setAttribute('id',`${text}-button`);
        //newButton.innerText = `${text}`;
        newButton.innerHTML = `<img src="${image}" class="side-icon" alt="${text} button">`
        sidePanel.appendChild(newButton);
        newButton.classList.add('side-button')
    }

    addSideButtonSingular("RESET","images/play-blue.png");
    addSideButtonSingular("RETURN","images/arrow-blue.png");

    let resetButton = document.getElementById("RESET-button");
    let returnButton = document.getElementById("RETURN-button");

    resetButton.addEventListener('click',()=>{
        resetGame();

        for (l = 0; l < cards.length; l++) {
            cards[l].classList.remove("uncovered");
        }
    })
    returnButton.addEventListener('click',()=>{
        removeSideButtons();
        //document.getElementById("central-area").innerHTML = '<button class="theme-button" id="Paw Patrol"><img class="logo" src="images/Paw Patrol/paw patrol dogues.png"></button>';
        document.getElementById("central-area").innerHTML = frontPage;
        
        addThemeListClickability();
        //if the default front page changes, adjust also this (how to do that automatically?)
    })
}

function removeSideButtons(){
    document.getElementById('side-panel').remove();
}

function addCardClickability() {

    for (j = 0; j < cards.length; j++) {
        cards[j].addEventListener('click', (e) => {
            //console.log('start of the event after the card is clidke')
            //console.log(e)
            //console.log(e.target)
            if (firstClickedCard === null) {
                firstClickedCard = ensureEventBubbling(e);
                firstClickedCard.querySelector('.card').classList.toggle("clicked");
            } else if (secondClickedCard === null && ensureEventBubbling(e).getAttribute('class') !== "card-content card-back") { //the second one ensures the same card is not used twice
                secondClickedCard = ensureEventBubbling(e);
                secondClickedCard.querySelector('.card').classList.toggle("clicked");
            }
        })
        cards[j].addEventListener('transitionend', () => { //!!!!!!!!!!!!!!!!! make sure the current transition ends because one blocks anothers!!!!!
            transitions++ //ensure both ends are fired
            console.log("transitionend")
            console.log(`transitons: ${transitions}`)

            if (secondClickedCard !== null && transitions > 1) { //if the second card has been clicked and assigned to variable
                setTimeout(function() { //don't do that too fast
                    if (firstClickedCard.getAttribute('class') === secondClickedCard.getAttribute('class')) {
                        // firstClickedCard.querySelector('.card').remove();//instead of this, try to manipulate visibility
                        // secondClickedCard.querySelector('.card').remove();//so that they will not shift after enough elements are removed
                        firstClickedCard.querySelector('.card').setAttribute('class','removed-card')
                        secondClickedCard.querySelector('.card').setAttribute('class','removed-card')
                        firstClickedCard = null;
                        secondClickedCard = null;
                        console.log("check if game is finished should run");
                        checkIfGameIsFinished();
                    } else { //to later be changed into turning the cards back etc.

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
    populateGame(pickedTheme);
}


function checkIfGameIsFinished() {
    if (document.getElementsByClassName("card").length === 0) {
        resetGame();
        // document.getElementById("central-area").innerHTML = "";
        // populateGame(pickedTheme);
    }
}

function removeThemeButtons() {
    let counter = themeList.length
    for (j = 0; j < counter; j++) {
        console.log(themeList);
        themeList[0].remove()
    }
}