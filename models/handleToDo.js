"use strict";
const mon = require(".mongooseWrap");
const Todo = require("./ToDo");
const dbServer = "localhost";
const dbName = "user";

exports.upsertToDo = async function (req) {
    let toDo = new ToDo({
        title: req.body.title,
        text: req.body.text,
        deadline: req.body.deadline,
        start: req.body.start
    });
    try { 
        let cs = await mon.upsert(dbServer, dbName, ToDo, toDo);   
} catch(e) {
    console.error(e);
    }
};