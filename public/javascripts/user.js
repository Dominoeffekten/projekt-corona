"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

//var url = window.location.href.substring(22);

const getTodos = function (ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/users/user", showToDos);
};


var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
var day = d.getDate()
let date = year +"-"+month+"-"+day
 

//callback function for the above AJaX
const showToDos = function (e) {
    //brugernavn
    $("name").value = "user";
    //start dato for to do
    $("start").setAttribute("value", date);
    $("start").setAttribute("min", date);
    //deadline
    $("deadline").setAttribute("value", date);
    $("deadline").setAttribute("min", date);

}


window.addEventListener("load", getTodos);
 
