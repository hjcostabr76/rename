
import { getDB, getDBRows, insertDbRows } from '../notion/notion.api'
import { planMock01 } from './mocks/mock.plan'
import { IActivity, IPlan } from './habit-tracker.types'
import { DBQueryResultT, DBQueryFilterT, DbInsertResultTP, IPageResponse } from '../notion/notion.types'
import { Notion } from '../notion/notion.classes'
import dotenv from "dotenv"
import { createPlanFromActivity } from './habit-tracker.utils'
import { ID_DB_ACTIVITY, ID_DB_PLAN } from './habit-tracker.constants'

dotenv.config()

/**
 * Retrieve current selection of activities.
 * 
 * TODO: 2025-05-08 - Check this typing
 * TODO: 2025-05-08 - Check this as a whole
 * 
 * @returns {Promise<IPageResponse<IActivity>[]>} Array of activities sorted by priority
 */
export async function getSelectedActivities(): Promise<IPageResponse<IActivity>[]> {

    const filters: DBQueryFilterT = {
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
    return response.results as IPageResponse<IActivity>[]
}


/**
 * TODO: 2025-05-03 - ADD Description
 */
export async function getPlans(): Promise<DBQueryResultT> {
    return await getDBRows(Notion.getClient(), ID_DB_PLAN)
}

/**
 * Creates a plan row in the Plans database.
 * 
 * TODO: 2025-05-03 - Remove mocking
 * TODO: 2025-05-03 - Check this typing
 * 
 * @returns {Promise<DbInsertResultTP>} The result of the database insert
 */
export async function createPlan(): Promise<DbInsertResultTP> {
    return await insertDbRows(Notion.getClient(), ID_DB_PLAN, planMock01)
}

/**
 * TODO: 2025-05-08 - ADD Description
 */
export async function getPlanDB() {
    return await getDB(Notion.getClient(), ID_DB_PLAN)
}

/**
 * TODO: 2025-05-03 - ADD Description
 */
export async function planDayFromActivitiesSelection() {

    // Get activities
    /**
     * TODO: 2025-05-08 - Undo this testing arrangement
     */
    // const activities = (await getSelectedActivities()).results
    const activities_: IPageResponse<IActivity>[] = await getSelectedActivities()
    const activities = [ activities_[0] ]
    
    // Create plans
    const plans: IPlan[] = activities.map(activity => createPlanFromActivity(activity))
    return await Promise.all(plans.map(plan => insertDbRows(Notion.getClient(), ID_DB_PLAN, plan)))
}
