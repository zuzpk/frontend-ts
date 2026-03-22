// import { cookies } from 'next/headers';
import { withGet } from '@zuzjs/core';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SESS_NAME } from './config';
import { User } from './types';

const routes = {
    private: [
        "/hub",
        "/teams",
        "/backup",
        "/snapshot",
        "/sync",
        "/app",
        "/servers",
        "/storage"
    ],
    public: [
        `/u`
    ]
}

export async function proxy(req: NextRequest) {
    
    const pathname = req.nextUrl.pathname;
    
    const isPrivate = routes.private.some(path => pathname.startsWith(path));
    const isPublic = routes.public.some(path => pathname.startsWith(path));

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

    if ( !oauth ){
        return NextResponse.next()
    }

    let response: NextResponse;

    if ( 
        oauth.kind &&
        (pathname == `/` || isPublic)
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

    
    if (oauth.kind && oauth.you) {
        response.cookies.set('__ud', JSON.stringify(oauth.you), {
            path: '/',
            maxAge: 60 * 60,
            sameSite: 'lax',
            httpOnly: false
        });
        response.cookies.set('__push', oauth.push_pk, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax',
            httpOnly: false
        });
    }
    
    return response
    
}

export const config = {
    matcher: `/((?!api|zauth|static|ws|wss|@|.*\\..*|_next).*)`,
};