export function buildTree(people) {

    const map = {};
    let root = null;

    people.forEach(person => {
        map[person._id] = { ...person, children: [] };
    });

    people.forEach(person => {

        if (person.parent) {

            map[person.parent].children.push(map[person._id]);

        } else {

            root = map[person._id];

        }

    });

    return root;

}