import { IPlan } from '../global/global.types'

const activityIds = [
    {
        "id": "1e09fd15-896b-8152-9732-d2812687ed33"
    },
    {
        "id": "1e09fd15-896b-81ef-baf4-c1f75c792d13"
    },
    {
        "id": "1e09fd15-896b-8143-9075-d38018fee063"
    },
    {
        "id": "1e09fd15-896b-8189-9add-f6d73ade6ef3"
    }
]


/**
 * TODO: 2025-05-03 - ADD Description
 */
export const planMock01: IPlan = {
    "Activity": {
        "relation": [
            {
                "id": activityIds[2].id
            }
        ],
    },
    "Comment.": {
        rich_text: [
            {
                type: 'text',
                "text": {
                    "content": "[api] test 02"
                },
                "plain_text": "[api] test 02"
            }
        ]
    },
    "Date": {
        "type": "date",
        "date": {
            // "start": "2025-05-02",
            "start": new Date(),
            "end": null,
            "time_zone": null
        }
    },

    // "Edition": any
    // "Error Warn": any
    // "Estimate Type": any
    "Exec.s": {
        "select": {
                "name": "1×"
            }
    },
    // "Info.": any
    "Name": {
        "title": [
            {
                "text": {
                    "content": "[api] New Test 02"
                },
                plain_text: "[api] New Test 02",
            },
        ]
    },
    "P": {
        "select": {
            "name": "2"
        }
    },
    // "Plan Activ. Name": any
    // "Plan Activities": any
    // "Plan Group": any
    // "Plan Type": any
    // "Pomo.'s": 2,
    // "Time boxes": any
}