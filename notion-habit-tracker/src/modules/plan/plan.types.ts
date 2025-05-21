import { PriorityT, ExecNumberT, PomoNumberT } from '../../global/global.types'
import { INotionPropTitle, INotionPropRelation, INotionPropText, INotionPropDate, INotionPropSelect } from '../../notion/notion.types'

export type PlanTypeT = 'Group' | 'Activ.'

/**
 * TODO: 2025-05-08 - Check this
 * TODO: 2025-05-08 - ADD Description
 */
export interface IPlan {
    Name: INotionPropTitle
    Activity: INotionPropRelation
    'Comment.': INotionPropText
    /**
     * TODO: 2025-05-06 - Check this!
     */
    Date: INotionPropDate
    P: INotionPropSelect<PriorityT>
    "Exec.s": INotionPropSelect<ExecNumberT>
    "Plan Group": INotionPropRelation
    "Pomo.'s": INotionPropSelect<PomoNumberT>
    "Time boxes": INotionPropRelation
    // "": any
    // "(aux) Activ. Comment": any
    // "(aux) Activ. Group": any
    // "(aux) Activ. P": any
    // "(aux) Activ. type": any
    // "(aux) Name": any
    // "(aux) Parent Group P": any
    // "(aux) Parent Group": any
    // "(aux) Parent Pomo.s": any
    // "(aux) Parent Type": any
    // "(aux) Plan Group Title": any
    // "(err) Group Estimate Type": any
    // "(err) Incompl.": any
    // "(err) Naming": any
    // "(err) Parent Relation": any
    // "Creation": any
    // "Edition": any
    // "Error Warn": any
    // "Estimate Type": any
    // "Info.": any
    // "Plan Activ. Name": any
    // "Plan Activities": any
    // "Plan Type": any
}
