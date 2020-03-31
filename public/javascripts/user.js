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
const download = function (ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/users/download");
};
 
//Make to do
const makeToDos = function (e) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate()
    let date = year +"-"+month+"-"+day

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
    let to = JSON.parse(e.target.responseText);

    to.forEach(function (todo) {
        let tabel = document.createElement("table");
        let tr = document.createElement("tr");
        let td = document.createElement("td");

        let form = document.createElement('form');
        form.setAttribute("method", "POST");
        form.setAttribute("action", "/users/user");

        let input = document.createElement('input');
        input.setAttribute("value", todo.title);
        input.setAttribute("name", "title");
        input.setAttribute("type", "hidden");
        form.appendChild(input);

        let delButton = document.createElement('button');
        delButton.setAttribute("class", "delButton");
        let delI = document.createTextNode("X");
        delButton.appendChild(delI);
        form.appendChild(delButton);

        td.appendChild(form);
        tr.appendChild(td);
        

        let tr1 = document.createElement('tr');
        let p = document.createElement("p");
        let tit = document.createTextNode("Title: " + todo.title);
        p.appendChild(tit);
        tr1.appendChild(p);

        let p1 = document.createElement("p");
        let text = document.createTextNode("Message: " + todo.text);
        p1.appendChild(text);
        tr1.appendChild(p1);

        let p2 = document.createElement("p");
        let start = document.createTextNode("Start: " + todo.start);
        p2.appendChild(start);
        tr1.appendChild(p2);

        let p3 = document.createElement("p");
        let dead = document.createTextNode("Deadline: " + todo.deadline);
        p3.appendChild(dead);
        tr1.appendChild(p3);

        tabel.appendChild(tr);
        tabel.appendChild(tr1);

        $("toDo").appendChild(tabel);
        
    });



    let JSONform = document.createElement('form');
        JSONform.setAttribute("method", "POST");
        JSONform.setAttribute("action", "/users/download");

        let JSONinput = document.createElement('input');
        JSONinput.setAttribute("name", "title");
        JSONinput.setAttribute("type", "hidden");
        JSONform.appendChild(JSONinput);

        let JSONdelButton = document.createElement('button');
        let JSONdelI = document.createTextNode("Download todo JSON");
        JSONdelButton.setAttribute("type", "submit");
        JSONdelButton.appendChild(JSONdelI);
        JSONform.appendChild(JSONdelButton);

        $("toDo").appendChild(JSONform);

}

function work(){
    newTodos();
    getTodos();
}


window.addEventListener("load", work);
 
