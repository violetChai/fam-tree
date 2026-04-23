const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: String,
    birthYear: Number,

    // relationships
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    spouse: { type: mongoose.Schema.Types.ObjectId, ref: "Person", default: null },

    photo: String,
    video: String
});

module.exports = mongoose.model("Person", personSchema);