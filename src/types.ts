export type User = {
    loading: boolean,
    ID: string | null,
    oid?: number,
    utp?: UserType,
    name?: string,
    email?: string,
    cc?: string,
    status?: UserStatus
}

export enum UserType {
    Guest = 0,
    User = 1,
    Admin = 2
}

export enum UserStatus {
    InActive = 0,
    Active = 1,
    Banned = -1,
}

export enum DB {
    You = "you"
}
