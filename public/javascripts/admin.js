"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

//var url = window.location.href.substring(22);

const newTodos = function (ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/users/admin", makeToDos);
};
const getTodos = function (ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/users/admin/:user", showToDos);
};
 
//Make to do
const makeToDos = function (e) {
    
}
//Sho to do
const showToDos = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("userList");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }


    //Opret forbindelse til api continent indholdet
    let users = JSON.parse(e.target.responseText);

    let tabel = document.createElement("table");

    users.forEach(function (user) {

        let tr1 = document.createElement('tr');
        let td1 = document.createElement('td');
        let tit = document.createTextNode("Title: " + user.role);
        let td2 = document.createElement('td');
        let name = document.createTextNode("First name: " + user.firstName);
        td2.appendChild(name);
        td1.appendChild(tit);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        
        tabel.appendChild(tr1);

    });
    $("userList").appendChild(tabel);
}

function work(){
    newTodos();
    getTodos();
}


window.addEventListener("load", work);
 
