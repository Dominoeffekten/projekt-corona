"use strict";
const mon = require("./mongooseWrap");
const ToDo = require("./ToDo");
const dbServer = "localhost";
const dbName = "user";

exports.upsertToDo = async function (req) {
    let chk = { title: req.body.title };
    let toDo = new ToDo({
        title: req.body.title,
        text: req.body.text,
        deadline: req.body.deadline,
        start: req.body.start
    });
    try { 
        let cs = await mon.upsert(dbServer, dbName, ToDo, toDo, chk);   
        return;
} catch(e) {
    console.error(e);
    }
};

exports.getToDo = async function (query, sort) {
    try {
        let cs = await mon.retrieve(dbServer, dbName, ToDo, query, sort);
        return cs;
    } catch (e) {
        console.error(e);
    }
}; 

exports.delToDo = async function (name) {
    try {
        let cs = await mon.remove(dbServer, dbName, ToDo, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}