import Client from '@notionhq/client/build/src/Client'

/**
 * TODO: 2025-05-03 - ADD Description
 */
export type NotionDbQueryFilterT = Omit<Parameters<Client['databases']['query']>[0], 'database_id' | 'auth'>

/**
 * REVIEW: 2025-05-21 - Check this
 * TODO: 2025-05-21 - ADD Description
 */
export type NotionDbQueryResultT = Awaited<ReturnType<Client['databases']['query']>>

/**
 * REVIEW: 2025-05-21 - Check this
 * TODO: 2025-05-21 - ADD Description
 */
export type NotionDbInsertResultTP = Awaited<ReturnType<Client['pages']['create']>>

type NotionFileT = INotionHostedFile | INotionExternalFile
type NotionIconT = NotionFileT | INotionEmoji
type NotionUserTypeT = 'person' | 'bot'

type NotionRichTextTypeT = "text" | "mention" | "equation"

export type NotionColorT =
    | 'blue_background'
    | 'blue'
    | 'brown_background'
    | 'brown'
    | 'default'
    | 'gray_background'
    | 'gray'
    | 'green_background'
    | 'green'
    | 'orange_background'
    | 'orange'
    | 'pink_background'
    | 'pink'
    | 'purple_background'
    | 'purple'
    | 'red_background'
    | 'red'
    | 'yellow_background'
    | 'yellow'
 
type NotionMentionTypeT =
    | 'database'
    | 'date'
    | 'link_preview'
    | 'page'
    | 'template_mention'
    | 'user'

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

interface INotionPageAbstract<O extends 'page' | 'database', P extends Record<keyof P, INotionProp>> {
    
    readonly id?: string
    object: O

    archived: boolean
    in_trash: boolean

    properties: P
    parent: INotionDatabaseParent
    cover: NotionFileT | null
    icon: NotionIconT

    public_url: string | null
    url: string
    
    created_by: INotionUser
    created_time: string | Date
    last_edited_by: INotionUser
    last_edited_time: string | Date
}

export interface INotionPage<P extends Record<keyof P, INotionProp>> extends INotionPageAbstract<'page', P> {}

export interface INotionDatabase< P extends Record<keyof P, INotionProp>> extends INotionPageAbstract<'database', P> {
    title: INotionPropTitle
    description: INotionRichText[]
    is_inline: boolean
}
  
export interface INotionHostedFile {
    readonly type: 'file'
    file: {
        url: string
        expiry_time: string | Date
    }
}

export interface INotionExternalFile {
    readonly type: 'external'
    external: {
        url: string
    }
}

export interface INotionEmoji {
    readonly type: 'emoji'
    emoji: string
}

export interface INotionUser<T extends NotionUserTypeT = NotionUserTypeT> {
    readonly object: 'user'
    readonly id: string
    readonly type?: T
    readonly name?: string
    readonly avatar_url?: string
}

export interface INotionPerson extends INotionUser<'person'> {  
    person: {
        email: string
    }
}

export interface INotionWorkspaceBot extends INotionUser<'bot'> {
    bot: {
        owner: {
            type: 'workspace'
            workspace: true
        }
        workspace_name: string
    }
}

/**
 * REVIEW: 2025-05-08 - This typing is probably wrong
 */
export interface INotionUserBot extends INotionUser<'bot'> {
    bot: {
        owner: {
            type: 'user'
        }
    }
}

export interface INotionDatabaseParent {
    type: 'database_id'
    database_id: string
}

export interface INotionPageParent {
    type: 'page_id'
    page_id: string
}

export interface INotionBlockParent {
    type: 'block_id'
    block_id: string
}
export interface INotionWorkspaceParent {
    type: 'workspace'
    workspace: true
}

export interface INotionRichText<T extends NotionRichTextTypeT = NotionRichTextTypeT, H extends string | null = string | null> {
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
 * REVIEW: 2025-05-07 - Finish the typing of Mention types
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

interface INotionProp<T extends NotionPropTypeT = NotionPropTypeT> {
    readonly id?: string
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
export interface INotionPropSelect<T extends string> extends INotionProp<'select'> {
    select: {
        id: string
        name: T
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
export interface INotionPropMultiSelect<T extends string> extends INotionProp<'multi_select'> {
    multi_select: INotionPropSelect<T>[]
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

export interface INotionPropFile {
    readonly type: 'file'
    file: INotionHostedFile | INotionExternalFile
}