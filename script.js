/*
TO DO:

ensure that after removal the rest of the cards do not move
cover cards until clicking
animate turning cards
have the cards be uncover at the start and then turn into covered-mode


button to reset to theme choice

more themes:
MLP
Captain Claw
Peppa Pig

problems:




*/

const themes = (function () {


    function themeMaker(name) {
        let theme = Object.create(themeMaker.proto);
        theme.name = name;
        return theme;
    }

    themeMaker.proto = {
        getName: function () {
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

let themeList=document.getElementsByClassName("theme-button");
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

function ensureEventBubbling(situation){//
    console.log("ensure bubbling runs")
    console.log(situation)
    console.log(situation.target)
    console.log(`situation.target.getAttribute('class') is ${(situation.target.getAttribute('class'))}`)
    console.log(`situation.target.class is ${JSON.stringify(situation.target.class)}`)
    //console.log(`variable is ${variable}`)
    if (situation.target.getAttribute('class')==="card-content"||situation.target.getAttribute('class')==="logo"){//if the picture is clicked, bubble to the button
        console.log(`situation.target.parentNode is ${JSON.stringify(situation.target.parentNode)}`)
        return situation.target.parentNode;
    }
    else {
        console.log(`situation.target is ${JSON.stringify(situation.target)}`)
        return situation.target;
    }
    //console.log(`variable is ${variable}`)
}

for (i=0;i<themeList.length;i++){//themeList=document.getElementsByClassName("theme-button");
    themeList[i].addEventListener('click',(e)=>{
        console.log(`pickedTheme is ${pickedTheme}`)
        pickedTheme=ensureEventBubbling(e).id;
        //pickedTheme=e.target.id;
        console.log(`pickedTheme after ensure event bubbling is ${pickedTheme}`)
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

const centralArea = document.getElementById("central-area");

function populateGame(theme){
    console.log("populate game runs")
    function createCard(name){
        let card = document.createElement('button');
        card.classList.add("card")
        card.classList.add(`${name}`)
        card.innerHTML = `<img class="card-content" src="images/${theme}/${name}.png">`
        centralArea.appendChild(card)
    }
    console.log(`Theme is ${theme}`)
    if (theme==="Paw Patrol"){
        createCard('chase');
        createCard('skye');
        createCard('marshall');
        createCard('rocky');
        createCard('zuma');
        createCard('rubble');
//double
        createCard('chase');
        createCard('skye');
        createCard('marshall');
        createCard('rocky');
        createCard('zuma');
        createCard('rubble');
    }
    let cards=document.getElementsByClassName('card')
    for (j=0;j<cards.length;j++){
        cards[j].addEventListener('click',(e)=>{
            
            console.log(e.target)
            if (firstClickedCard===null){
                firstClickedCard=ensureEventBubbling(e);
                firstClickedCard.classList.toggle("clicked");
            }
            else if (secondClickedCard===null){
                secondClickedCard=ensureEventBubbling(e);
                secondClickedCard.classList.toggle("clicked");

                if (firstClickedCard.getAttribute('class')==secondClickedCard.getAttribute('class')){
                    firstClickedCard.remove();
                    secondClickedCard.remove();
                    firstClickedCard = null;
                    secondClickedCard = null;
                    console.log("check if game is finished should run");
                    checkIfGameIsFinished();
                }
                else {//to later be changed into turning the cards back etc.
                    firstClickedCard.classList.toggle("clicked");
                    secondClickedCard.classList.toggle("clicked");
                    firstClickedCard = null;
                    secondClickedCard = null;

                }
            }

            
            
            //console.log(`efirstClickedCard is ${JSON.stringify(firstClickedCard)}`)

            
        })
    }

}
document.createElement('button')


function checkIfGameIsFinished(){
    if (document.getElementsByClassName("card").length===0){
        populateGame(pickedTheme);
    }
}


//<button class="theme-button" id="Paw Patrol"><img class="logo" src="images/Paw Patrol/paw patrol dogues.png"></button>

function removeThemeButtons(){
   for (j=0;j<themeList.length;j++){
       themeList[j].remove()
   }
}




