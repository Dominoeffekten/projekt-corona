const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.set('debug', { color: false });

const countrySchema = mongoose.Schema({
    code: {
        type: String,
        minlength: 3,
        maxlength: 3,
    },
    name: {
        type: String,
        required: [true, 'You need to write a countryname'],
        minlength: 3,
        unique: true
    },
    continent: String,
    region: String,
    surfacearea: Number,
    indepyear: Number,
    population: Number,
    lifeexpectancy: Number,
    gnp: Number,
    gnpold: Number,
    localname: String,
    governmentform: String,
    headofstate: {
        type: String,
        required: [true, 'You need to write who the boss is'],
        minlength: 3,
    },
    capital: Number,
    code2: {
        type: String,
        minlength: 2,
        maxlength: 2,
    },
});

module.exports = mongoose.model("Country", countrySchema, 'country');
