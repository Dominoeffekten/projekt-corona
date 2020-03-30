const mongoose = require("mongoose");

const continentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Where are the country?'],
        unique: true
    },
});

module.exports = mongoose.model("Continent", continentSchema, 'continent');
