import Realm from 'realm';
export const REGION_SCHEMA = 'Region';

export const RegionSchema = {
    name: REGION_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        value: { type: 'string', indexed: true },
        createdAt: 'date',
        updatedAt: 'date'
    }
}
