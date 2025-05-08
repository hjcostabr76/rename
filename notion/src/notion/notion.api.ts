import { Client } from "@notionhq/client"
import { DBQueryFilterT, DBQueryResultT, DbInsertResultTP } from './notion.types'


/**
 * Retrieves a Notion database by its ID.
 * 
 * @param {Client} notionClient - The Notion client used to interact with the API.
 * @param {string} dbId - The ID of the database to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the database object.
 */

export async function getDB(notionClient: Client, dbId: string) {
    const response = await notionClient.databases.retrieve({ database_id: dbId })
    return response
}

/**
 * Queries a Notion database for rows matching the given filters.
 * 
 * @param {Client} notionClient - The Notion client used to interact with the API.
 * @param {string} dbId - The ID of the database to query.
 * @param {DBQueryFilterT} [filters] - Optional filters to apply to the query.
 * @returns {Promise<DBQueryResultT>} - A promise that resolves to the query result.
 */

export async function getDBRows(notionClient: Client, dbId: string, filters?: DBQueryFilterT): Promise<DBQueryResultT> {
    return await notionClient.databases.query({ database_id: dbId, ...filters })
}

/**
 * Inserts a new row into the specified database.
 * 
 * @param {Client} notionClient - The Notion client used to interact with the API.
 * @param {string} dbId - The ID of the database to insert the row into.
 * @param {Record<string, any>} properties - The properties of the row to be inserted.
 * @returns {Promise<DbInsertResultTP>} - A promise that resolves to the result of the insertion.
 */
export async function insertDbRows(notionClient: Client, dbId: string, properties: Record<string, any>): Promise<DbInsertResultTP> {

    /**
     * TODO: 2025-05-08 - Remove this logging
     */
    console.log({ create: JSON.stringify({
        // "cover": {
        //     "type": "external",
        //     "external": {
        //         "url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
        //     }
        // },
        // "icon": {
        //     "type": "emoji",
        //     "emoji": "🥬"
        // },
        parent: {
            type: 'database_id',
            database_id: dbId,
        },
        properties,
    }) })


    return await notionClient.pages.create({
        // "cover": {
        //     "type": "external",
        //     "external": {
        //         "url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
        //     }
        // },
        // "icon": {
        //     "type": "emoji",
        //     "emoji": "🥬"
        // },
        parent: {
            type: 'database_id',
            database_id: dbId,
        },
        properties,
    })
}