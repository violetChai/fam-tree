const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    birthYear: Number,

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person"
    },

    spouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person"
    }

});

module.exports = mongoose.model("Person", PersonSchema);