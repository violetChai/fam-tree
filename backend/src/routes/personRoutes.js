const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.get("/", async (req, res) => {
    const people = await Person.find();
    res.json(people);
});

router.post("/", async (req, res) => {
    const newPerson = new Person(req.body);
    const saved = await newPerson.save();
    res.json(saved);
});

module.exports = router;