let addB = document.querySelector("#addButton");
let myToDoList = document.querySelector("#list");

let skoleButton = document.querySelector("#skole");
let arbejdeButton = document.querySelector("#arbejde");
let fritidButton = document.querySelector("#fritid");

let inputFelt = document.querySelector("#myInput");

//Giver input-feltet en kategori

skoleButton.addEventListener("click", function(){
    inputFelt.classList.toggle("makeBlue");
})

arbejdeButton.addEventListener("click", function(){
    inputFelt.classList.toggle("makeOrange");
})

fritidButton.addEventListener("click", function(){
    inputFelt.classList.toggle("makeYellow");
})

//Tilgøjer input-felt til min to-do liste  

addB.addEventListener("click", addItem);

function addItem() {
    let li = document.createElement("li");
    let inputValue = document.querySelector("#myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    //Hvis input feltet er tomt, do nothing 
    if (inputValue === "") {
        console.log("skriv noget!")

        //Hvis ikke det er tomt, tillæg list-item til min liste 
    } else {
        myToDoList.appendChild(li);
        console.log("virker det?");
    }
    
    //Giv mit list-item en farve 
    
    if(inputFelt.classList.contains('makeBlue')){
        li.classList.add('makeBlue');
    }
    else if(inputFelt.classList.contains('makeOrange')) {
        li.classList.add('makeOrange');
    }
    else if(inputFelt.classList.contains('makeYellow')){
        li.classList.add('makeYellow');
    }
    
   
    
    document.querySelector("#myInput").value = "";
    inputFelt.classList.remove('makeBlue');
    inputFelt.classList.remove('makeYellow');
    inputFelt.classList.remove('makeOrange');

    //Generer en 'luk' knap for hver tilføjet listItem
    let closeButton = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    closeButton.className = "close";
    closeButton.appendChild(txt);
    li.appendChild(closeButton);

    //Slet listItem når man klipper den tilhørerende 'luk' knap
    let close = document.querySelectorAll('.close');
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function () {
            console.log("something's working")
            this.parentElement.classList.add('hide')
            console.log(this.parentElement);
        })
    }
    
//    close.addEventListener('click', function(event){
//        event.target.style.display = "none"; 
//    })
    
    li.addEventListener('click', checkOff)
    function checkOff(ev){
        this.classList.toggle('checked');
    }

}

// Hide completed tasks
var trashButton = document.querySelector("#trash");
trashButton.addEventListener('click', function(){
    console.log('opgaver skal slettes');
    var listOfTasks = document.querySelectorAll('li');
    var i;
    for (i = 0; i < listOfTasks.length; i++) {
        if (listOfTasks[i].classList.contains('checked')) {
            listOfTasks[i].classList.add('hide');
        }
    }
});
