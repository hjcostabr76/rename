import { planMock01 } from '../../mocks/mock.plan'
import { getDB, getDBRows, insertDbRows } from '../../notion/notion.api'
import { Notion } from '../../notion/notion.classes'
import { NotionDbQueryResultT, NotionDbInsertResultTP, INotionPage } from '../../notion/notion.types'
import { getSelectedActivities } from '../activity/activity.controller'
import { IActivity } from '../activity/activity.types'
import { ID_DB_PLAN } from './plan.constants'
import { IPlan } from './plan.types'
import { createPlanFromActivity } from './plan.utils'


/**
 * REVIEW: 2025-05-21 - should we have a 'model' for these 'controller methods'?
 */

/**
 * TODO: 2025-05-08 - ADD Description
 */
export async function getPlanDB() {
    return await getDB(Notion.getClient(), ID_DB_PLAN)
}

/**
 * TODO: 2025-05-03 - ADD Description
 */
export async function getPlans(): Promise<NotionDbQueryResultT> {
    return await getDBRows(Notion.getClient(), ID_DB_PLAN)
}

/**
 * Creates a plan row in the Plans database.
 * 
 * TODO: 2025-05-03 - Remove mocking
 * TODO: 2025-05-03 - Check this typing
 * 
 * @returns {Promise<NotionDbInsertResultTP>} The result of the database insert
 */
export async function createPlan(): Promise<NotionDbInsertResultTP> {
    return await insertDbRows(Notion.getClient(), ID_DB_PLAN, planMock01)
}

/**
 * TODO: 2025-05-03 - ADD Description
 */
export async function planDayFromActivitiesSelection() {

    // Get activities
    /**
     * FIXME: 2025-05-08 - Undo this testing arrangement
     */
    // const activities = (await getSelectedActivities()).results
    const activities_: INotionPage<IActivity>[] = await getSelectedActivities()
    const activities = [ activities_[0] ]
    
    // Create plans
    const plans: INotionPage<IPlan>[] = activities.map(activity => createPlanFromActivity(activity))
    return await Promise.all(plans.map(plan => insertDbRows(Notion.getClient(), ID_DB_PLAN, plan)))
}
