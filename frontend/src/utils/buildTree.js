export function buildTree(people) {

    if (!people || people.length === 0) {
        return {
            name: "Family",
            children: []
        };
    }

    const map = {};
    const roots = [];

    // create node map
    people.forEach(p => {
        map[p._id] = {
            _id: p._id,
            name: p.name,
            birthYear: p.birthYear,
            children: []
        };
    });

    // build relationships using parents array
    people.forEach(p => {

        if (p.parents && p.parents.length > 0) {

            p.parents.forEach(parentId => {
                if (map[parentId]) {
                    map[parentId].children.push(map[p._id]);
                }
            });

        } else {
            roots.push(map[p._id]);
        }

    });

    return {
        name: "Family",
        children: roots
    };
}