import Realm from 'realm';
export const FLAVOUR_SCHEMA = 'Flavour';

export const FlavourSchema = {
    name: FLAVOUR_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        value: { type: 'string', indexed: true },
        createdAt: 'date',
        updatedAt: 'date'
    }
}
