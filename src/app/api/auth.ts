import { AUTH_USER_HEADER } from "@/config"
import { User } from "@/types"
import { headers } from "next/headers"

export const getCurrentUser = async (): Promise<User> => {

    const headerStore = await headers()
    const authUserHeader = headerStore.get(AUTH_USER_HEADER)

    if (!authUserHeader) {
        return {
            loading: false,
            ID: null
        }
    }

     try {

        const authUser = JSON.parse(decodeURIComponent(authUserHeader)) as Partial<User>

        return {
            loading: false,
            ...authUser
        } as User

    }
    catch {
        return {
            loading: false,
            ID: null
        }
    }

}