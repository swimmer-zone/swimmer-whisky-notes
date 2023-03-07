import Realm from 'realm';
export const LINK_SCHEMA = 'Link';

export const LinkSchema = {
    name: LINK_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        value: { type: 'string', indexed: true },
        href: 'string',
        linkGroup: { type: 'int', indexed: true },
        createdAt: 'date',
        updatedAt: 'date'
    }
}
