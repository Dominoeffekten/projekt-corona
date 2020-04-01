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
    req.getFile("/users/admin/user", showToDos);
};

const readData = function (ev) { //Continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/adminData`, showData);
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
    tabel.setAttribute("id", "adminTabel");
    let tr  = document.createElement('tr');
    let th = document.createElement("th");
    let p = document.createTextNode("Title");
    th.appendChild(p);
    tr.appendChild(th);

    let th1 = document.createElement("th");
    let p1 = document.createTextNode("First name");
    th1.appendChild(p1);
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    let p2 = document.createTextNode("Update");
    th2.appendChild(p2);
    tr.appendChild(th2);

    tabel.appendChild(tr);

    users.forEach(function (user) {

        let tr1 = document.createElement('tr');

        let td1 = document.createElement('td');
        let tit = document.createTextNode(user.role);
        td1.appendChild(tit);
        tr1.appendChild(td1);
        let td2 = document.createElement('td');
        let name = document.createTextNode(user.firstName);
        td2.appendChild(name);
        tr1.appendChild(td2);
        
        let td3 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute("method", "POST");
        form.setAttribute("action", "/users/adminData");

        let input = document.createElement('input');
        input.setAttribute("value", user.email);
        input.setAttribute("name", "email");
        input.setAttribute("type", "hidden");
        form.appendChild(input);
        
        let delButton = document.createElement('button');
        delButton.setAttribute("class", "delButton");
        let delI = document.createTextNode("X");
        form.addEventListener('click', readData);
        delButton.appendChild(delI);
        form.appendChild(delButton);

        td3.appendChild(form);
        tr1.appendChild(td3);
        tabel.appendChild(tr1);

    });
    
    $("userList").appendChild(tabel);
}


const showData = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let role = JSON.parse(e.target.responseText);
    console.log(role);
 }

function work(){
    newTodos();
    getTodos();
}


window.addEventListener("load", work);
 
