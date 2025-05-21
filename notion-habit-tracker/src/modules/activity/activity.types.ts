import { PriorityT } from '../../global/global.types'
import { INotionPropCheckbox, INotionPropMultiSelect, INotionPropRelation, INotionPropSelect, INotionPropStatus, INotionPropText, INotionPropTitle } from '../../notion/notion.types'
import { PlanTypeT } from '../plan/plan.types'


/**
 * TODO: 2025-05-08 - Check this
 * TODO: 2025-05-08 - ADD Description
 */
export interface IActivity {
    // '(aux) Group P': string
    // '(aux) Group Select.': string
    // Creation: string
    // Edition: string
    'Comment.': INotionPropText
    // 'Group Name': unknown
    // 'Group Title': unknown
    Activities: INotionPropRelation
    Name: INotionPropTitle
    P: INotionPropSelect<PriorityT>
    Select: INotionPropCheckbox
    Status: INotionPropStatus
    Tags: INotionPropMultiSelect<string>
    Type: INotionPropSelect<PlanTypeT>
}