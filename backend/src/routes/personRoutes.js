const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const protect = require("../middleware/authMiddleware");

//PUBLIC
router.get("/", async (req, res) => {
    const people = await Person.find();
    res.json(people);
});

//PROTECTED
router.post("/", protect, async (req, res) => {
    const newPerson = new Person(req.body);
    const saved = await newPerson.save();
    res.json(saved);
});

module.exports = router;