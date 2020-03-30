const mongoose = require("mongoose");

const governmentformSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'How decide the things?'],
        unique: true
    },
});

module.exports = mongoose.model("GovernmentForm", governmentformSchema, 'governmentform');
