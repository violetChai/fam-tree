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
            name: p.name,
            children: []
        };
    });

    // link parents
    people.forEach(p => {

        if (p.parent && map[p.parent]) {
            map[p.parent].children.push(map[p._id]);
        } else {
            roots.push(map[p._id]);
        }

    });

    // wrap in single root for D3
    return {
        name: "Family",
        children: roots
    };
}