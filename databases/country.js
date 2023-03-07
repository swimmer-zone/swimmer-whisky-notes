import Realm from 'realm';
export const COUNTRY_SCHEMA = 'Country';

export const CountrySchema = {
    name: COUNTRY_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        value: { type: 'string', indexed: true },
        createdAt: 'date',
        updatedAt: 'date'
    }
}

const databaseOptions = {
    path: 'country.realm',
    schema: [CountrySchema],
    schemaVersion: 0
};

export const _create = (newRecord) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(COUNTRY_SCHEMA, newRecord);

            resolve(newRecord);
        })

    }).catch((error) => reject(error));
});

export const _read = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let all = realm.objects(COUNTRY_SCHEMA);

        resolve(all);
    }).catch((error) => reject(error));
});

export const _readById = (readId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let current = realm.objectForPrimaryKey(COUNTRY_SCHEMA, readId);

            resolve(current);
        });
    }).catch((error) => reject(error));
});

export const _update = (updating) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let current = realm.objectForPrimaryKey(COUNTRY_SCHEMA, updating.id);
            current.value = updating.value;
            current.updatedAt = new Date.now();

            resolve(current);
        });
    }).catch((error) => reject(error));
});

export const _delete = (deleteId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let current = realm.objectForPrimaryKey(COUNTRY_SCHEMA, deleteId);
            realm.delete(current);

            resolve();
        })

    }).catch((error) => reject(error));
});

export default new Realm(databaseOptions);
