let data = [
    {
        place: 'City center, main park',
        flowersSmelled: 12,
        visitedBy: ['Steve', 'David', 'Christopher']
    },
    {
        place: 'River island',
        flowersSmelled: 27,
        visitedBy: ['Laure', 'Christopher', 'Patrick', 'Orsy']
    },
    {
        place: 'Steve\'s apartment',
        flowersSmelled: 4,
        visitedBy: ['Steve', 'Victor']
    },
    {
        place: 'Univeristy Campus',
        flowersSmelled: 43,
        visitedBy: ['Steve', 'David', 'Christopher', 'Laure', 'Orsy', 'Patrick', 'Victor']
    },
    {
        place: 'Public Library',
        flowersSmelled: 2,
        visitedBy: ['Laure', 'Orsy']
    }
];

// Which place was visited by the most friends?
//Log the solution into the browser console!

console.log(data.reduce((a, b) => a.visitedBy.length > b.visitedBy.length ? a : b).place);


