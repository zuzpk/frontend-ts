import { type IDBOptions } from "@zuzjs/hooks"
import packageJson from "../package.json"
import { DB } from "./types"

export const APP_NAME = "Zuz"
export const APP_TAGLINE = "ZuzJS Frontend"
export const APP_DESCRIPTION = "Nextjs Boilerplate"
export const APP_URL = "http://cms.zuz.com.pk/"
export const API_URL = "http://localhost:3001/@/"
export const APP_VERSION = packageJson.version
export const GA_MEASUREMENT_ID : string | null = null;
export const FB_PIXEL_ID : string | null = null;

export const SESS_NAME : string = `${APP_NAME.toLowerCase()}.sid`
export const AUTH_USER_HEADER : string = `x-auth-user`
export const ADMIN_EMAIL = `hello@zuz.com.pk`;

export const REDIRECT_AFTER_OAUTH = `/`;

export const LocalDB = {
    App: {
        name: APP_NAME.toLowerCase(),
        version: +APP_VERSION.replace(/\./g, ``),
        meta: [
            {
                name: DB.You,
                config: { keyPath: "ID", autoIncrement: false },
                schema: [
                    { name: "ID", unique: true },
                    { name: "utp" },
                    { name: "name" },
                    { name: "email" },
                    { name: "cc" },
                    { name: "status" },
                ],
            },
        ]
    } satisfies IDBOptions
}