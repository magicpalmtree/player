/**
 * Example of the format the data should be exported from interactr
 */
export default {
    project:{
        id: 12234,
        image_url:'https://s3.amazonaws.com/interactr-2-source-plppvsc270ey/temp/thumbnails/193ab2f0-cae4-43e2-b85e-be607e7c34dc.jpg',
        start_node_id: 116384,
        base_width: 720,
        base_height: 405,
        embed_width: 720,
        embed_height: 405,
        autoplay: 0,
        user_id: 1,
        font: "Lato",
        branding_image_src :  'https://s3.amazonaws.com/interactr-2-source-plppvsc270ey/temp/brandingImages/b7c5736d-73f5-459a-a656-b3b1a21d0a7e.jpg',
        player_skin:{
            bigPlay:{
                color: '#fff',
                size: 5
            },
            controls:{
                background: 'rgba(62, 169, 245, 0.8)',
                color: '#ffffff',
            }
        },
        chapters:0,
        chapter_items:[
            {
                thumbnail: 'https://swiftcdn6.global.ssl.fastly.net/thumbnails/e0ad7ca4474f11ea841126da2310e7c4/thumbnail.jpg',
                title: 'Video One',
                video_id: 115625
            },
            {
                thumbnail: 'https://swiftcdn6.global.ssl.fastly.net/thumbnails/33f4e582481811eaaada7af46a0e219f/thumbnail.jpg',
                title: 'Video Two',
                video_id: 115626
            },
            {
                thumbnail: 'https://swiftcdn6.global.ssl.fastly.net/thumbnails/1bda2920481911eaae887af46a0e219f/thumbnail.jpg',
                title: 'Video Three',
                video_id: 115628
            },
        ],
        fbPixelId: 135143543513,
        share_data:{
            url: 'https://vuejs.org/', // Should be the URL of the share page
            email: {
                use: true,
                text: 'Email',
                subject: 'Interactive Video',
                body: '<a href="http://google.com">Click here</a> to checkout this cool Interactive Video'
            },
            facebook: {
                use: true,
                text: 'Share'
            },
            linkedin: {
                use: true,
                text: 'Share',
                title: 'Checkout this cool Interactive Video',
            },
            twitter: {
                use: true,
                text: 'Tweet'
            },
            pintrest: {
                use: true,
                text: 'Pin'
            }
        },
        gdpr_text: "When you press play, you agree that Interactr will collect anonymous, aggregated statistics about how you watch our videos.",
        privacy_policy_url: null,
    },
    videos:[
        {
            id: 115625,
            manifest_url: 'https://swiftcdn6.global.ssl.fastly.net/hls/e0ad7ca4474f11ea841126da2310e7c4/playlist.m3u8',
        },
        {
            id: 115626,
            manifest_url: 'https://swiftcdn6.global.ssl.fastly.net/hls/33f4e582481811eaaada7af46a0e219f/playlist.m3u8',

        },
        {
            id: 115627,
            manifest_url: 'https://swiftcdn6.global.ssl.fastly.net/hls/33f4e582481811eaaada7af46a0e219f/playlist.m3u8',
        },
        {
            id: 115624,
            manifest_url: 'https://swiftcdn6.global.ssl.fastly.net/hls/33f4e582481811eaaada7af46a0e219f/playlist.m3u8',
        },
        {
            id: 115628,
            manifest_url: 'https://swiftcdn6.global.ssl.fastly.net/hls/1bda2920481911eaae887af46a0e219f/playlist.m3u8',
        }
    ],
    nodes:[
        {
            "id": 116384,
            "name": "Node - Cross Fitness Intro",
            "description": null,
            "posX": 229,
            "posY": 290,
            "completeAction": null,
            "completeActionArg": null,
            "project_id": 19606,
            "media_id": 115624,
            "has_chapters": 0,
            "created_at": "2020-02-06 20:19:44",
            "updated_at": "2020-02-06 20:19:44",
            "chapters_file": "",
            "loop": 0,
            "interactions": [
                {
                    "id": 204506,
                    "element_type": "App\\HotspotElement",
                    "element_id": 77419,
                    "timeIn": 47.8,
                    "timeOut": 55.06,
                    "node_id": 116384,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 77419,
                        "posX": 82,
                        "posY": 205,
                        "width": 117,
                        "height": 99,
                        "action": "playNode",
                        "actionArg": "116385",
                        "open_in_new_tab": 1,
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Track Running",
                        "zIndex": 0
                    }
                },
                {
                    "id": 204507,
                    "element_type": "App\\HotspotElement",
                    "element_id": 77420,
                    "timeIn": 47.89,
                    "timeOut": 55.06,
                    "node_id": 116384,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 77420,
                        "posX": 227,
                        "posY": 208,
                        "width": 121,
                        "height": 99,
                        "action": "playNode",
                        "actionArg": "116386",
                        "open_in_new_tab": 1,
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Obstacle Course",
                        "zIndex": 0
                    }
                },
                {
                    "id": 204508,
                    "element_type": "App\\HotspotElement",
                    "element_id": 77421,
                    "timeIn": 47.89,
                    "timeOut": 55.06,
                    "node_id": 116384,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 77421,
                        "posX": 366,
                        "posY": 209,
                        "width": 109,
                        "height": 97,
                        "action": "playNode",
                        "actionArg": "116387",
                        "open_in_new_tab": 1,
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Lifting Weights",
                        "zIndex": 0
                    }
                },
                {
                    "id": 204509,
                    "element_type": "App\\HotspotElement",
                    "element_id": 77422,
                    "timeIn": 47.89,
                    "timeOut": 55.06,
                    "node_id": 116384,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 77422,
                        "posX": 493,
                        "posY": 210,
                        "width": 145,
                        "height": 96,
                        "action": "playNode",
                        "actionArg": "116388",
                        "open_in_new_tab": 1,
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Something Else",
                        "zIndex": 0
                    }
                }
            ],

            "chapters": [

            ]
        },
        {
            "id": 116385,
            "name": "Node - Track Running",
            "description": null,
            "posX": 481,
            "posY": 36,
            "completeAction": null,
            "completeActionArg": null,
            "project_id": 19606,
            "media_id": 115625,
            "has_chapters": 0,
            "created_at": "2020-02-06 20:19:44",
            "updated_at": "2020-02-06 20:19:44",
            "chapters_file": "",
            "loop": 0,
            "interactions": [
                {
                    "id": 204510,
                    "element_type": "App\\TriggerElement",
                    "element_id": 17478,
                    "timeIn": 37.26,
                    "timeOut": 38.06,
                    "node_id": 116385,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 17478,
                        "action": "openModal",
                        "actionArg": "15795",
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Element 1"
                    }
                }
            ],

            "chapters": [

            ]
        },
        {
            "id": 116386,
            "name": "Node - Obstacle Course",
            "description": null,
            "posX": 483,
            "posY": 208,
            "completeAction": null,
            "completeActionArg": null,
            "project_id": 19606,
            "media_id": 115626,
            "has_chapters": 0,
            "created_at": "2020-02-06 20:19:44",
            "updated_at": "2020-02-06 20:19:44",
            "chapters_file": "",
            "loop": 0,
            "interactions": [
                {
                    "id": 204511,
                    "element_type": "App\\TriggerElement",
                    "element_id": 17479,
                    "timeIn": 39.2,
                    "timeOut": 39.78,
                    "node_id": 116386,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 17479,
                        "action": "openModal",
                        "actionArg": "15795",
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Element 1"
                    }
                }
            ],

            "chapters": [

            ]
        },
        {
            "id": 116387,
            "name": "Node - Lifting weights",
            "description": null,
            "posX": 484,
            "posY": 378,
            "completeAction": null,
            "completeActionArg": null,
            "project_id": 19606,
            "media_id": 115627,
            "has_chapters": 0,
            "created_at": "2020-02-06 20:19:44",
            "updated_at": "2020-02-06 20:19:44",
            "chapters_file": "",
            "loop": 0,
            "interactions": [
                {
                    "id": 204512,
                    "element_type": "App\\TriggerElement",
                    "element_id": 17480,
                    "timeIn": 41.49,
                    "timeOut": 43.45,
                    "node_id": 116387,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 17480,
                        "action": "openModal",
                        "actionArg": "15795",
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Element 1"
                    }
                }
            ],

            "chapters": [

            ]
        },
        {
            "id": 116388,
            "name": "Node - Something Else",
            "description": null,
            "posX": 490,
            "posY": 553,
            "completeAction": null,
            "completeActionArg": null,
            "project_id": 19606,
            "media_id": 115628,
            "has_chapters": 0,
            "created_at": "2020-02-06 20:19:44",
            "updated_at": "2020-02-06 20:19:44",
            "chapters_file": "",
            "loop": 0,
            "interactions": [
                {
                    "id": 204513,
                    "element_type": "App\\TriggerElement",
                    "element_id": 17481,
                    "timeIn": 11.92,
                    "timeOut": 11.94,
                    "node_id": 116388,
                    "created_at": "2020-02-06 20:19:44",
                    "updated_at": "2020-02-06 20:19:44",
                    "pause_when_shown": 0,
                    "element_group_id": null,
                    "element": {
                        "id": 17481,
                        "action": "openModal",
                        "actionArg": "15795",
                        "created_at": "2020-02-06 20:19:44",
                        "updated_at": "2020-02-06 20:19:44",
                        "name": "Element 1"
                    }
                }
            ],

            "chapters": [

            ]
        }
    ],
    modals:[
        {
            "id": 13131,
            "name": "Menu knop",
            "created_at": "2019-06-07 12:26:44",
            "updated_at": "2019-06-07 12:26:44",
            "is_template": 0,
            "template_image_url": null,
            "template_name": null,
            "project_id": 16272,
            "backgroundColour": "rgba(255, 255, 255, 1)",
            "show_close_icon": 0,
            "border_radius": 0,
            "size": 100,
            "close_icon_color": "#113348",
            "elements": [
                {
                    "id": 35144,
                    "element_type": "App\\ImageElement",
                    "element_id": 30494,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:33:50",
                    "updated_at": "2019-06-07 12:33:50",
                    "element": {
                        "id": 30494,
                        "posX": 247,
                        "posY": 9,
                        "width": 192,
                        "height": 144,
                        "src": "https:\/\/s3.amazonaws.com\/interactr-2-source-plppvsc270ey\/temp\/imageElements\/10300004-d6fe-4624-aec1-1252e1492ebb.jpg",
                        "action": "openUrl",
                        "actionArg": "https:\/\/hypnotherapiejacobs.nl\/Hypnotherapie",
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:33:50",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "Swinging clock",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35147,
                    "element_type": "App\\ImageElement",
                    "element_id": 30495,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:37:32",
                    "updated_at": "2019-06-07 12:37:32",
                    "element": {
                        "id": 30495,
                        "posX": 317,
                        "posY": 195,
                        "width": 139,
                        "height": 107,
                        "src": "https:\/\/s3.amazonaws.com\/interactr-2-source-plppvsc270ey\/temp\/imageElements\/0d456a09-a4fd-47fd-9768-3f39a34e830a.jpg",
                        "action": "openUrl",
                        "actionArg": "https:\/\/hypnotherapiejacobs.nl\/Hypnotherapie-Jacobs",
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:37:32",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "More information",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35148,
                    "element_type": "App\\ImageElement",
                    "element_id": 30496,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:37:38",
                    "updated_at": "2019-06-07 12:37:38",
                    "element": {
                        "id": 30496,
                        "posX": 647,
                        "posY": 24,
                        "width": 73,
                        "height": 81,
                        "src": "https:\/\/s3.amazonaws.com\/interactr-2-source-plppvsc270ey\/temp\/imageElements\/f2f76af6-b36f-4089-8fb3-447261f257ac.png",
                        "action": "openUrl",
                        "actionArg": "https:\/\/hypnotherapiejacobs.nl\/afspraak",
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:37:38",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "Appointment calender",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35150,
                    "element_type": "App\\ImageElement",
                    "element_id": 30497,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:39:54",
                    "updated_at": "2019-06-07 12:39:54",
                    "element": {
                        "id": 30497,
                        "posX": 78,
                        "posY": 106,
                        "width": 216,
                        "height": 118,
                        "src": "https:\/\/s3.amazonaws.com\/interactr-2-source-plppvsc270ey\/temp\/imageElements\/3a2e6fa0-3003-492d-9a84-7f74e1c94773.gif",
                        "action": null,
                        "actionArg": null,
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:39:54",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "Element 7",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35151,
                    "element_type": "App\\ImageElement",
                    "element_id": 30498,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:41:22",
                    "updated_at": "2019-06-07 12:41:22",
                    "element": {
                        "id": 30498,
                        "posX": 386,
                        "posY": 271,
                        "width": 220,
                        "height": 134,
                        "src": "https:\/\/s3.amazonaws.com\/interactr-2-source-plppvsc270ey\/temp\/imageElements\/d2b17116-fa2e-499f-8438-734a00d49511.gif",
                        "action": null,
                        "actionArg": null,
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:41:22",
                        "updated_at": "2019-06-07 14:37:04",
                        "name": "Element 8",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35152,
                    "element_type": "App\\ImageElement",
                    "element_id": 30499,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:42:16",
                    "updated_at": "2019-06-07 12:42:16",
                    "element": {
                        "id": 30499,
                        "posX": 452,
                        "posY": 67,
                        "width": 217,
                        "height": 106,
                        "src": "https:\/\/s3.amazonaws.com\/interactr-2-source-plppvsc270ey\/temp\/imageElements\/3a2e6fa0-3003-492d-9a84-7f74e1c94773.gif",
                        "action": null,
                        "actionArg": null,
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:42:16",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "Element 7",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35154,
                    "element_type": "App\\ImageElement",
                    "element_id": 30501,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:45:51",
                    "updated_at": "2019-06-07 12:45:51",
                    "element": {
                        "id": 30501,
                        "posX": 509,
                        "posY": 306,
                        "width": 211,
                        "height": 99,
                        "src": "https:\/\/s3.amazonaws.com\/userdata.youzign.com\/wp-content\/uploads\/x\/2019\/06\/thumbnail-cOyV2T.png",
                        "action": null,
                        "actionArg": null,
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:45:51",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "Element 9",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35155,
                    "element_type": "App\\ImageElement",
                    "element_id": 30502,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:46:11",
                    "updated_at": "2019-06-07 12:46:11",
                    "element": {
                        "id": 30502,
                        "posX": 461,
                        "posY": 153,
                        "width": 235,
                        "height": 78,
                        "src": "https:\/\/s3.amazonaws.com\/userdata.youzign.com\/wp-content\/uploads\/x\/2019\/06\/thumbnail-QKoNH3.png",
                        "action": null,
                        "actionArg": null,
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:46:11",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "Element 10",
                        "zIndex": 0
                    }
                },
                {
                    "id": 35156,
                    "element_type": "App\\ImageElement",
                    "element_id": 30503,
                    "modal_id": 13131,
                    "created_at": "2019-06-07 12:57:21",
                    "updated_at": "2019-06-07 12:57:21",
                    "element": {
                        "id": 30503,
                        "posX": 0,
                        "posY": 167,
                        "width": 225,
                        "height": 142,
                        "src": "https:\/\/s3.amazonaws.com\/userdata.youzign.com\/wp-content\/uploads\/x\/2019\/06\/thumbnail-Mph3WG.png",
                        "action": null,
                        "actionArg": null,
                        "open_in_new_tab": 1,
                        "created_at": "2019-06-07 12:57:21",
                        "updated_at": "2019-06-07 12:58:45",
                        "name": "Element 9",
                        "zIndex": 0
                    }
                }
            ]
        }
    ]
}