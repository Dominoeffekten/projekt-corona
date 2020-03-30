const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
    oldid: Number,
    name: {
        type: String,
        minlength: [3, "name to short"],
        maxlength: 3
    },
    countrycode: {
        type: String,
        minlength: 3,
        maxlength: 3
    },
    district: String,
    population: Number
});

module.exports = mongoose.model("City", citySchema, 'city');
