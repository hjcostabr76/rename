import express, { Response } from 'express'
import { planDayFromActivitiesSelection, createPlan, getPlans, getPlanDB } from './modules/plan/plan.controller'
import { API_PORT } from './global/global.constants'
import { getSelectedActivities } from './modules/activity/activity.controller'

const app = express()

app.get('/', (req, res: Response) => {
    res.send('Hello World!')
})

app.get('/activities', async (req, res: Response) => {
    const activities = await getSelectedActivities()
    res.send(activities)
})

/**
 * REVIEW: 2025-05-21 - Think of a better endpoint for it
 */
app.get('/plan', async (req, res: Response) => {
    const planDb = await getPlanDB()
    res.send(planDb)
})

app.get('/plans', async (req, res: Response) => {
    const plans = await getPlans()
    res.send(plans)
})

app.post('/plans', async (req, res: Response) => {
    const plan = await createPlan()
    res.send(plan)
})

app.post('/plans/day-activities', async (req, res: Response) => {
    const plan = await planDayFromActivitiesSelection()
    res.send(plan)
})

app.listen(API_PORT, () => {
    console.log(`Example app listening on port ${API_PORT}`)
})
