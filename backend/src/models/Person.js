const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthYear: Number,
    parentId: String
});

module.exports = mongoose.model("Person", PersonSchema);