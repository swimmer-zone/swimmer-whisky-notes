import Realm from 'realm';
export const DISTILLERY_SCHEMA = 'Distillery';

export const DistillerySchema = {
    name: DISTILLERY_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        value: { type: 'string', indexed: true },
        latitude: 'float',
        longitude: 'float',
        createdAt: 'date',
        updatedAt: 'date'
    }
}
