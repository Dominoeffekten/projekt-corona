const mongoose = require("mongoose");

const countrylanguageSchema = mongoose.Schema({
    oldid: Number,
    countrycode: {
        type: String,
        minlength: 3,
        maxlength: 3,
    },
    language: String,
    isofficial: {
        type: String,
        required: [true, 'You need to if it is official or not']
    },
    percentage: {
        type: Number,
        max: 100,
    }
});

module.exports = mongoose.model("CountryLanguage", countrylanguageSchema, 'countrylanguage');
