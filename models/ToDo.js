const mongoose = require("mongoose");

const toDoSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: false
    },
    deadline: {
        type: Date,
        required: true,
    },
    start: {
        type: Date,
        required: false,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ToDo", toDoSchema, 'todo');