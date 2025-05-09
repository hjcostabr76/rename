import { formatDate } from '../common/date'
import { INotionPage } from '../notion/notion.types'
import { IActivity, IPlan, PlanTypeT } from './habit-tracker.types'

/**
 * Returns the standardized name for a plan.
 *
 * @param activityName - The name of the activity to plan.
 * @param type - The type of plan to create.
 * @param date - The date of the plan.
 * @returns A string name for the plan.
 */
export function getPlanName(activityName: string, type: PlanTypeT, date: Date): string {
    return `[plan] (${formatDate(date)}) ${type} - ${activityName}`
}

/**
 * TODO: 2025-05-08 - Improve this
 * TODO: 2025-05-08 - ADD Description
 */
export function createPlanFromActivity(activity: INotionPage<IActivity>): INotionPage<IPlan> {
    throw new Error('Not implemented')
    // console.log({ activity: JSON.stringify(activity) })
    // return planMock01
}