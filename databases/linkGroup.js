import Realm from 'realm';
export const LINK_GROUP_SCHEMA = 'LinkGroup';

export const LinkGroupSchema = {
    name: LINK_GROUP_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        value: { type: 'string', indexed: true },
        createdAt: 'date',
        updatedAt: 'date'
    }
}
