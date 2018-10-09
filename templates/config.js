module.exports = {
    "placeHolder": "$template$",
    "defaultType": "classComp",
    "types": {
        "classComp": {
            "source": "class",
            "destination": "src/views/components"
        },
        "container": {
            "source": "container",
            "destination": "src/views/container"
        },
        "funcComp": {
            "source": "container",
            "destination": "src/views/components",
            
        
        "duckWithRemote": {
            "source": "duckWithRemote",
            "destination": "src",
            "manualInfo": [
                {
                    file: '\\src\\redux\\root-saga.ts',
                    parts: [
                        `import {$template$Watcher} from './$template$/sagas';`,
                        `call($template$Watcher)`,
                    ]
                },
                {
                    file: '\\src\\redux\\app-state.model.ts',
                    parts: [
                        `import { $Template$ } from "../models/ $Template$.model";`,
                        `$Template$: $Template$;`,
                    ]
                }
                ,
                {
                    file: '\\src\\redux\\app-state.ts',
                    parts: [
                        `import $Template$ from './$Template$/reducers'`,
                        `$Template$`,
                    ]
                }
            ],
        }
    }
}