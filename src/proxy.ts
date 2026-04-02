import { withGet } from "@zuzjs/core";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_USER_HEADER, SESS_NAME } from "./config";
import { User } from "./types";

const routes = {
    private: [
        "/hub"
    ],
    public: [
        `/u`
    ],
    shared: []
}

export async function proxy(req: NextRequest) {
    
    const pathname = req.nextUrl.pathname;
    
    const isPrivate = routes.private.some(path => pathname.startsWith(path));
    const isPublic = routes.public.some(path => pathname.startsWith(path));
    const isShared = routes.shared.some(path => pathname.startsWith(path));

    const auth = (await cookies()).get(SESS_NAME)

    if ( 
        !auth && 
        isPrivate
    ){
        return NextResponse.redirect(new URL(`/u/signin?_nxt=${pathname}`, req.url))
    }

    const oauth = await withGet<{ 
        kind?: string;
        you: User;
        push_pk: string;
    }>(
        `${process.env.API_URL}auth`,
        undefined,
        false,
        {
            Cookie: req.headers.get(`cookie`)
        }
    )
    .catch(err => {})

    const requestHeaders = new Headers(req.headers)
    
    if ( !oauth ){
        return NextResponse.next()
    }

    let response: NextResponse = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    if ( 
        oauth.kind &&
        (pathname == `/` || (isPublic && !isShared))
    ){
        response = NextResponse.redirect(new URL(`/hub?_=${Date.now()}`, req.url))
    }
    else if ( 
        !oauth.kind && 
        isPrivate
    ){
        return NextResponse.redirect(new URL(`/u/signin?_nxt=${pathname}`, req.url))
    }
    else {
        response = NextResponse.next()
    }

    if ( oauth.kind ){
        
        requestHeaders.set(AUTH_USER_HEADER, JSON.stringify(oauth.you))
        if (!response.headers.get('location')) {
            response = NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
        }
    }

    return response

}

export const config = {
    matcher: `/((?!api|zauth|static|ws|wss|@|.*\\..*|_next).*)`,
};