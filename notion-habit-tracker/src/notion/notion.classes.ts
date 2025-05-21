import { Client } from '@notionhq/client'
import { NOTION_API_KEY } from './notion.constants'

/**
 * Singleton that manages a Notion client instance, which is used to interact with the Notion API.
 */
export class Notion {
    private static client: Client

    public static getClient(): Client {
        return Notion.client ?? new Client({ auth: NOTION_API_KEY })
    }

    private constructor() {}
}