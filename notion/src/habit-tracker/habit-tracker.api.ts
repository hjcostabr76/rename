import express, { Response } from 'express'
import { planDayFromActivitiesSelection, createPlan, getSelectedActivities, getPlans, getPlanDB } from './habit-tracker.controller'
import { API_PORT } from './habit-tracker.constants'

const app = express()

app.get('/', (req, res: Response) => {
    res.send('Hello World!')
})

app.get('/activities', async (req, res: Response) => {
    const activities = await getSelectedActivities()
    res.send(activities)
})

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
