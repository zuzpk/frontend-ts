import { APP_VERSION } from "./config";

export enum Store {
    App = "app",
    User = "user",
}

export const AppStore = {
    App : {
        version: APP_VERSION,
        debug: true,
        token: null,
        theme: `system`
    },
    User : {
        loading: true,
        ID: null
    }
}