const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const protect = require("../middleware/authMiddleware");

// GET all people (PUBLIC)
router.get("/", async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        res.json(person);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE person (PROTECTED)
router.post("/", protect, async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const saved = await newPerson.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id", protect, async (req, res) => {
    try {
        const updated = await Person.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;