/*
TO DO:
reset do wyboru

inne motywy:
Kucyki
Kapitan Pazur

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
console.log(themeList[0].id)

function iterateThrough(list, func, method){
    for (i=0;i<list.length;i++){
        console.log(list[i])
        if (func!=null){
            func(list[i])
        }
        else if (method!=null){
            list[i].method()
        }
    }
}

iterateThrough(themeList,null,addEventListener('click',(e)=>{
    removeThemeButtons();
    console.log(e.target.parentNode)
    pickedTheme=e.target.parentNode.id
    console.log(pickedTheme) 
    populateGame(pickedTheme)  
}))


function populateGame(theme){

}
document.createElement('button')


//<button class="theme-button" id="Paw Patrol"><img class="logo" src="images/Paw Patrol/paw patrol dogues.png"></button>

function removeThemeButtons(){
   for (j=0;j<themeList.length;j++){
       themeList[j].remove()
   }
}




