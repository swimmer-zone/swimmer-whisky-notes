import Realm from 'realm';
export const TASTING_SCHEMA = 'Tasting';

export const TastingSchema = {
    name: TASTING_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        brand: { type: 'string', indexed: true },
        dateOfTasting: { type: 'date', indexed: true },
        countryId: 'int',
        regionId: 'int',
        nearestTown: 'string',
        caskStrength: { type: 'bool', default: false },
        chillFiltered: { type: 'bool', default: false },
        type: 'string',
        age: 'int',
        strength: { type: 'float', default: 40, indexed: true },
        taster: { type: 'bool', default: false },
        url: 'string',
        location: 'string',
        color: { type: 'string', default: 'Amber' },
        glance: { type: 'int', default: 50 },
        flavour: 'string',
        finish: 'string',
        rating: { type: 'float', default: 2.5, indexed: true },
        wouldBuy: { type: 'bool', default: false },
        notes: 'string',
        createdAt: 'date',
        updatedAt: 'date'
    }
};

const databaseOptions = {
    path: 'tasting.realm',
    schema: [TastingSchema],
    schemaVersion: 0
};

export const _create = (newRecord) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TASTING_SCHEMA, newRecord);

            resolve(newRecord);
        })

    }).catch((error) => reject(error));
});

export const _read = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let all = realm.objects(TASTING_SCHEMA);

        resolve(all);
    }).catch((error) => reject(error));
});

export const _readById = (readId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let current = realm.objectForPrimaryKey(TASTING_SCHEMA, readId);

            resolve(current);
        });
    }).catch((error) => reject(error));
});

export const _update = (updating) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let current = realm.objectForPrimaryKey(TASTING_SCHEMA, updating.id);
            current.brand = updating.brand;
            current.dateOfTasting = updating.dateOfTasting;
            current.countryId = updating.countryId;
            current.regionId = updating.regionId;
            current.nearestTown = updating.nearestTown;
            current.caskStrength = updating.caskStrength;
            current.chillFiltered = updating.chillFiltered;
            current.type = updating.type;
            current.age = updating.age;
            current.strength = updating.strength;
            current.taster = updating.taster;
            current.url = updating.url;
            current.location = updating.location;
            current.color = updating.color;
            current.glance = updating.glance;
            current.flavour = updating.flavour;
            current.finish = updating.finish;
            current.rating = updating.rating;
            current.wouldBuy = updating.wouldBuy;
            current.notes = updating.notes;
            current.updatedAt = new Date.now();

            resolve(current);
        });
    }).catch((error) => reject(error));
});

export const _delete = (deleteId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let current = realm.objectForPrimaryKey(TASTING_SCHEMA, deleteId);
            realm.delete(current);

            resolve();
        })

    }).catch((error) => reject(error));
});

export default new Realm(databaseOptions);
