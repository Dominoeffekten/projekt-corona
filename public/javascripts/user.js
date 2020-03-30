"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

//var url = window.location.href.substring(22);

const newTodos = function (ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/users/user", makeToDos);
};
const getTodos = function (ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/users/user/:todo", showToDos);
};
 
//Make to do
const makeToDos = function (e) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate()
    let date = year +"-"+month+"-"+day

    //brugernavn
    $("name").value = "user";
    //start dato for to do
    $("start").setAttribute("value", date);
    $("start").setAttribute("min", date);
    //deadline
    $("deadline").setAttribute("value", date);
    $("deadline").setAttribute("min", date);

}
//Sho to do
const showToDos = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("toDo");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let div = document.createElement("div");

    //Opret forbindelse til api continent indholdet
    let to = JSON.parse(e.target.responseText);

    let tabel = document.createElement("table");
    let tr = document.createElement("tr");
    let del = document.createTextNode("Delete");
    tr.appendChild(del);
    tabel.appendChild(tr);

    to.forEach(function (todo) {

        let tr = document.createElement('tr');
        let p = document.createTextNode("p");
        let tit = document.createTextNode(todo.title);
        //p.appendChild(tit);
        tr.appendChild(p);

        let p1 = document.createTextNode("p");
        let text = document.createTextNode(todo.text);
        p1.appendChild(text);
        tr.appendChild(p1);

        let p2 = document.createTextNode("p");
        let start = document.createTextNode(todo.start);
        p2.appendChild(start);
        tr.appendChild(p2);

        let p3 = document.createTextNode("p");
        let dead = document.createTextNode(todo.deadline);
        p3.appendChild(dead);
        tr.appendChild(p3);
        tabel.appendChild(tr);
    });

    div.appendChild(tabel);
    $("toDo").appendChild(div);

}

function work(){
    newTodos();
    getTodos();
}


window.addEventListener("load", work);
 
