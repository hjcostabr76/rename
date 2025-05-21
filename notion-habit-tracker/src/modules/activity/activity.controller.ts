import { getDBRows } from '../../notion/notion.api'
import { Notion } from '../../notion/notion.classes'
import { INotionPage, NotionDbQueryFilterT } from '../../notion/notion.types'
import { ID_DB_ACTIVITY } from './activity.constants'
import { IActivity } from './activity.types'

/**
 * Retrieve current selection of activities.
 * 
 * TODO: 2025-05-08 - Check this typing
 * TODO: 2025-05-08 - Check this as a whole
 * 
 * @returns {Promise<INotionPage<IActivity>[]>} Array of activities sorted by priority
 */
export async function getSelectedActivities(): Promise<INotionPage<IActivity>[]> {

    const filters: NotionDbQueryFilterT = {
        filter: {
            property: 'Select',
            checkbox: {
                equals: true,
            },
        },
        sorts: [
            {
                property: 'P',
                direction: 'ascending',
            },
        ],
    }

    const response = await getDBRows(Notion.getClient(), ID_DB_ACTIVITY, filters)
    return response.results as INotionPage<IActivity>[]
}