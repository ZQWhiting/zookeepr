const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers');

jest.mock('fs')

test('creates an zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: "darlene", id: "jfdjslkfjs32" },
        zookeepers
    );

    expect(zookeeper.name).toBe("darlene");
    expect(zookeeper.id).toBe("jfdjslkfjs32")
})

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            age: 12,
            favoriteAnimal: 'gorilla'
        },
        {
            id: '4',
            name: "noel",
            age: 34,
            favoriteAnimal: 'tiger'
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 12 }, startingZookeepers)

    expect(updatedZookeepers.length).toEqual(1);
})

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            age: 12,
            favoriteAnimal: 'gorilla'
        },
        {
            id: '4',
            name: "noel",
            age: 34,
            favoriteAnimal: 'tiger'
        },
    ];

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe("Erica")
})

test('validates personality traits', () => {
    const zookeeper = {
        id: '3',
        name: 'Erica',
        age: 12,
        favoriteAnimal: 'gorilla'
    };

    const invalidZookeeper = {
        id: '3',
        name: 'Erica',
        favoriteAnimal: 'gorilla'
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})