/*
TO DO:

GET TO RESET TRANSITIONEND TO ZERO AFTER UNCOVERING ALL THE CARDS, PERHAPS PUT ANOTHER SET INTERVAL A BIT LONGER THAN THE COVERING BACK AND THE FUCKTION WPOULD JUST
RESET THE INTERVAL TOZ ERO

problem: after enough are deleted, theyy shift 

button to reset to theme choice

add more pictures and then randomise them each time

ensure it is always sideways on mobile

ADD reset button

more themes:
MLP
Captain Claw
Peppa Pig
problems:

BUG: 



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

    return {
        PawPatrol,
        //themeList,
    }
})();
let pickedTheme;

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

        while (charactersAdded.length < characters.length * 2) {
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
                        firstClickedCard.querySelector('.card').remove();
                        secondClickedCard.querySelector('.card').remove();
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


function checkIfGameIsFinished() {
    if (document.getElementsByClassName("card").length === 0) {
        document.getElementById("central-area").innerHTML = "";
        populateGame(pickedTheme);
    }
}

function removeThemeButtons() {
    for (j = 0; j < themeList.length; j++) {
        themeList[j].remove()
    }
}