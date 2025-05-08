import { NotionRelation, NotionTitle, NotionSelectT, NotionCheckbox, NotionStatus, NotionMultiSelect, INotionRichText, NotionDateT } from '../notion/notion.types'

export type PlanTypeT = 'Group' | 'Activ.'
export type PriorityT = '1' | '2' | '3' | '4' | '5'
export type ExecNumberT = '1×' | '2×' | '3×' | '4×' | '5×'
export type PomoNumberT = '🍅 01' | '🍅 02' | '🍅 03' | '🍅 04' | '🍅 05'

/**
 * TODO: 2025-05-08 - Check this
 * TODO: 2025-05-08 - ADD Description
 */
export interface IActivity {
    // '(aux) Group P': string
    // '(aux) Group Select.': string
    // Creation: string
    // Edition: string
    id?: string
    'Comment.': string
    'Group Name': string
    'Group Title': string
    Activities?: NotionRelation[]
    Name: NotionTitle
    P: NotionSelectT<PriorityT>
    Select: NotionCheckbox
    Status: NotionStatus
    Tags?: NotionMultiSelect
    Type: NotionSelectT<PlanTypeT>
}

/**
 * TODO: 2025-05-08 - Check this
 * TODO: 2025-05-08 - ADD Description
 */
export interface IPlan {
    id?: string
    "Name": NotionTitle
    "Activity": NotionRelation
    "Comment.": INotionRichText
    /**
     * TODO: 2025-05-06 - Check this!
     */
    "Date": NotionDateT | Date
    "P": NotionSelectT<PriorityT>
    "Exec.s"?: NotionSelectT<ExecNumberT>
    "Plan Group"?: NotionRelation
    "Pomo.'s"?: NotionSelectT<PomoNumberT>
    "Time boxes"?: NotionRelation
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
