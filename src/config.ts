import { type IDBOptions } from "@zuzjs/hooks"
import packageJson from "../package.json"
import { DB } from "./types"

export const APP_NAME = "Zuz"
export const APP_TAGLINE = "ZuzJS Frontend"
export const APP_DESCRIPTION = "Nextjs Boilerplate"
export const APP_URL = "http://cms.zuz.com.pk/"
export const API_URL = "http://localhost:3001/@/"
export const APP_VERSION = packageJson.version
export const SESS_ID = `ui`
export const GA_MEASUREMENT_ID : string | null = null;
export const FB_PIXEL_ID : string | null = null;

export const ADMIN_EMAIL = `hello@zuz.com.pk`;

export const REDIRECT_AFTER_OAUTH = `/`;

export const LocalDB = {
    You: {
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

export const VAPID_PUBLIC_KEY = `BECsVJoeWAxJO4zcmvgIUyIielyhcvoel-Kth3sIlT4v1J_WWZsN89L2xoHUjR_hoRlK85d3kYJLuPsc4H21ypc`