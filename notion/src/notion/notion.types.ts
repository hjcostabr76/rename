import Client from '@notionhq/client/build/src/Client'

/**
 * TODO: 2025-05-03 - ADD Description
 */
export type DBQueryFilterT = Omit<Parameters<Client['databases']['query']>[0], 'database_id' | 'auth'>
export type DBQueryResultT = Awaited<ReturnType<Client['databases']['query']>>
export type DbInsertResultTP = Awaited<ReturnType<Client['pages']['create']>>

export interface IPageResponse<PropsT = Record<string, Object>> {
    archived: boolean
    created_by: Object
    created_time: string
    id: string
    last_edited_by: Object
    last_edited_time: string
    object: "page"
    url: string
    parent: {
        type: "database_id"
        database_id: string
    } | {
        type: "page_id"
        page_id: string
    } | {   
        type: "block_id"
        block_id: string
    } | {
        type: "workspace"
        workspace: true
    },
    properties: PropsT
}

export type NotionPropTypeT =
    | 'checkbox'
    | 'created_by'
    | 'created_time'
    | 'date'
    | 'email'
    | 'files'
    | 'formula'
    | 'last_edited_by'
    | 'last_edited_time'
    | 'multi_select'
    | 'number'
    | 'people'
    | 'phone_number'
    | 'relation'
    | 'rich_text'
    | 'rollup'
    | 'select'
    | 'status'
    | 'title'
    | 'url'





export type NotionTitle = {
    // title: Array<RichTextItemRequest>;
    title: [
        {
            // "type": "text",
            text?: {
                content: string,
                link?: string | null,
            },
            // "annotations": {
            //     "bold": false,
            //     "italic": false,
            //     "strikethrough": false,
            //     "underline": false,
            //     "code": false,
            //     "color": "default"
            // },
            plain_text: string,
            href?: string | null,
        }
    ],
    type?: 'title'
}


/**
 * =================================================
 * =================================================
 * --- PROPERTIES
 * =================================================
 * =================================================
 */

export interface INotionProp<T extends NotionPropTypeT> {
    id: string
    type: T
}


/**
 * TODO: 2025-05-07 - ADD Description
 */
export interface INotionPropTitle extends INotionProp<'title'> {
    title: INotionText[]
}

/**
 * TODO: 2025-05-07 - ADD Description
 * @see https://developers.notion.com/reference/property-value-object#select-property-values
 */
export interface INotionPropSelect extends INotionProp<'select'> {
    select: {
        id: string
        name: string
        readonly color: NotionColorT
    }
}

/**
 * TODO: 2025-05-07 - ADD Description
 * @see https://developers.notion.com/reference/property-value-object#date-property-values
 */
export interface INotionPropDate extends INotionProp<'date'> {
    date: {
        start: string | Date
        end?: string | Date
        time_zone?: string
    }
}

/**
 * TODO: 2025-05-07 - ADD Description
 * @see https://developers.notion.com/reference/property-value-object#relation-property-values
 */
export interface INotionPropRelation extends INotionProp<'relation'> {
    relation: Array<{ id: string }>
    has_more?: boolean
}

/**
 * TODO: 2025-05-07 - ADD Description
 * @see https://developers.notion.com/reference/property-value-object#checkbox-property-values
 */
export interface INotionPropCheckbox extends INotionProp<'checkbox'> {
    checkbox: boolean
}

/**
 * TODO: 2025-05-07 - ADD Description
 * @see https://developers.notion.com/reference/property-value-object#number-property-values
 */
export interface INotionPropNumber extends INotionProp<'number'> {
    number: number
}

/**
 * TODO: 2025-05-07 - ADD Description
 * @see https://developers.notion.com/reference/property-value-object#status-property-values
 */
export interface INotionPropStatus extends INotionProp<'status'> {
    id: string
    name: string
    readonly color: NotionColorT
}

/**
 * TODO: 2025-05-07 - ADD Description
 * @see https://developers.notion.com/reference/property-value-object#multi-select-property-values
 */
export interface INotionPropMultiSelect extends INotionProp<'multi_select'> {
    multi_select: Array<INotionPropSelect['select']>
}

export interface INotionPropText extends INotionProp<'rich_text'> {
    rich_text: INotionRichText<'text'>[]
}

/**
 * TODO: 2025-05-07 - Finish detailed typing of rollup property
 * @see https://developers.notion.com/reference/property-value-object#rollup-property-values
 */
export interface INotionPropRollup extends INotionProp<'rollup'> {
    rollup: {
        type: 'string' | 'number' | 'date' | 'array',
        string?: string
        number?: number
        date?: INotionPropDate
        array?: INotionPropText[] | INotionPropNumber[] | INotionPropDate[]
    }    
}

/**
 * =================================================
 * =================================================
 * --- PROPERTIES
 * =================================================
 * =================================================
 */


/**
 * TODO: 2025-05-07 - ADD Description
 */
export type NotionPropRichTextT<T extends NotionRichTextTypeT = 'text', H extends string | null = null> = {
    rich_text: Array<INotionRichText<T, H>>
}

// export type NotionPropSelectT = {
//     select: {
//         name: string
//     }
// }

type NotionRichTextTypeT = "text" | "mention" | "equation"

type NotionColorT =
 | 'blue'
 | 'blue_background'
 | 'brown'
 | 'brown_background'
 | 'default'
 | 'gray'
 | 'gray_background'
 | 'green'
 | 'green_background'
 | 'orange'
 | 'orange_background'
 | 'pink'
 | 'pink_background'
 | 'purple'
 | 'purple_background'
 | 'red'
 | 'red_background'
 | 'yellow'
 | 'yellow_background'
 
type NotionMentionTypeT =
    | 'database'
    | 'date'
    | 'link_preview'
    | 'page'
    | 'template_mention'
    | 'user'

export interface INotionRichText<T extends NotionRichTextTypeT, H extends string | null = null> {
    type: T,
    plain_text?: string
    href?: H
    annotations?: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: NotionColorT
    }
}

/**
 * TODO: 2025-05-07 - ADD Description
 */
export interface INotionEquation extends INotionRichText<'equation', null> {
    equation: {
        expression: string
    }
}

/**
 * TODO: 2025-05-07 - Finish the typing of Mention types
 * @see https://developers.notion.com/reference/rich-text#mention
 */
export interface INotionMention extends INotionRichText<'mention', string | null> {
    mention: { type: NotionMentionTypeT  } & Record<NotionMentionTypeT, any>,
}

/**
 * TODO: 2025-05-07 - ADD Description
 */
export interface INotionTextWithLink extends INotionRichText<'text', string> {
    text: {
        content: string,
        link?: {
            url: string
        },
    }
}

/**
 * TODO: 2025-05-07 - ADD Description
 */
export interface INotionText extends INotionRichText<'text', null> {
    text: {
        content: string,
        link?: null,
    }
}






export type NotionRelation = {
    // relation: Array<{ id: IdRequest }>
    id?: string,
    relation: { id: string } | Array<{ id: string }>
    type?: 'relation',
    // has_more: boolean
}




export type NotionNumber = {
    number: number | null
    type?: 'number'
}

export type NotionSelectT<NameT = string> = {
    select: {
        // id: StringRequest;
        // name?: StringRequest;
        // color?: SelectColor;
        id: string
        name?: NameT
        color?: string
    } | null | {
        // name: StringRequest;
        // id?: StringRequest;
        // color?: SelectColor;
        name: NameT
        id?: string
        color?: string
    } | null;
    type?: "select";
}

export type NotionDateT = {
    id?: string,
    date: null | {
        start: string | Date;
        end?: string | null;
        // time_zone?: TimeZoneRequest | null;
        time_zone?: string | null;
    },
    type?: "date",
}

export type NotionCheckbox = {
    checkbox: boolean
    type?: 'checkbox'
}


export type NotionStatus = {
    status: {
        // id: StringRequest;
        // name?: StringRequest;
        // color?: SelectColor;
        id: string
        name?: string
        color?: string
    } | null | {
        // name: StringRequest;
        // id?: StringRequest;
        // color?: SelectColor;
        name: string
        id?: string
        color?: string
    } | null;
    type?: 'status'
}


export type NotionMultiSelect = {
    multi_select: Array<{
        // id: StringRequest;
        // name?: StringRequest;
        // color?: SelectColor;
        id: string
        name?: string
        color?: string
    } | {
        // name: StringRequest;
        // id?: StringRequest;
        // color?: SelectColor;
        name: string
        id?: string
        color?: string
    }>;
    type?: 'multi_select'
}