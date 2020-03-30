const mongoose = require("mongoose");

const toDoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    deadline: {
        type: String,
        required: true
    },

    start: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model("ToDo", toDoSchema, 'todo');