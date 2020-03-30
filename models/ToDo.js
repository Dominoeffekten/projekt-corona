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
        type: Date,
        required: true
    },

    start: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("To do", toDoSchema, 'todo');