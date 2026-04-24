const Person = require("../models/Person");

// ADD PARENT
const addParent = async (req, res) => {
    try {

        const { parentId, childId } = req.body;

        if (!parentId || !childId) {
            return res.status(400).json({ message: "parentId and childId required" });
        }

        if (parentId === childId) {
            return res.status(400).json({ message: "Person cannot be their own parent" });
        }

        const parent = await Person.findById(parentId);
        const child = await Person.findById(childId);

        if (!parent || !child) {
            return res.status(404).json({ message: "Person not found" });
        }

        // enforce max 2 parents
        if (child.parents.length >= 2) {
            return res.status(400).json({ message: "Child already has two parents" });
        }

        // prevent duplicates
        if (child.parents.includes(parentId)) {
            return res.status(400).json({ message: "Parent relationship already exists" });
        }

        child.parents.push(parentId);
        parent.children.push(childId);

        await child.save();
        await parent.save();

        res.json({ message: "Parent added successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ADD CHILD
const addChild = async (req, res) => {
    try {

        const { parentId, childId } = req.body;

        if (!parentId || !childId) {
            return res.status(400).json({ message: "parentId and childId required" });
        }

        if (parentId === childId) {
            return res.status(400).json({ message: "Person cannot be their own child" });
        }

        const parent = await Person.findById(parentId);
        const child = await Person.findById(childId);

        if (!parent || !child) {
            return res.status(404).json({ message: "Person not found" });
        }

        if (child.parents.length >= 2) {
            return res.status(400).json({ message: "Child already has two parents" });
        }

        if (parent.children.includes(childId)) {
            return res.status(400).json({ message: "Child relationship already exists" });
        }

        parent.children.push(childId);
        child.parents.push(parentId);

        await parent.save();
        await child.save();

        res.json({ message: "Child added successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ADD SPOUSE
const addSpouse = async (req, res) => {
    try {

        const { personId, spouseId } = req.body;

        if (!personId || !spouseId) {
            return res.status(400).json({ message: "personId and spouseId required" });
        }

        if (personId === spouseId) {
            return res.status(400).json({ message: "Person cannot marry themselves" });
        }

        const person = await Person.findById(personId);
        const spouse = await Person.findById(spouseId);

        if (!person || !spouse) {
            return res.status(404).json({ message: "Person not found" });
        }

        if (person.spouse || spouse.spouse) {
            return res.status(400).json({ message: "One of the people already has a spouse" });
        }

        person.spouse = spouseId;
        spouse.spouse = personId;

        await person.save();
        await spouse.save();

        res.json({ message: "Spouse added successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// REMOVE RELATIONSHIP
const removeRelationship = async (req, res) => {
    try {

        const { personId, relatedPersonId, type } = req.body;

        const person = await Person.findById(personId);
        const related = await Person.findById(relatedPersonId);

        if (!person || !related) {
            return res.status(404).json({ message: "Person not found" });
        }

        if (type === "parent") {

            person.parents = person.parents.filter(
                id => id.toString() !== relatedPersonId
            );

            related.children = related.children.filter(
                id => id.toString() !== personId
            );

        }

        if (type === "child") {

            person.children = person.children.filter(
                id => id.toString() !== relatedPersonId
            );

            related.parents = related.parents.filter(
                id => id.toString() !== personId
            );

        }

        if (type === "spouse") {

            person.spouse = null;
            related.spouse = null;

        }

        await person.save();
        await related.save();

        res.json({ message: "Relationship removed successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addParent,
    addChild,
    addSpouse,
    removeRelationship
};