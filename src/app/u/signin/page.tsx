"use client"
import { APP_NAME, LocalDB, REDIRECT_AFTER_OAUTH } from '@/config';
import { AppStore } from '@/store';
import { dynamic } from '@zuzjs/core';
import { useDB } from '@zuzjs/hooks';
import { useStore } from '@zuzjs/store';
import { Box, Button, css, Form, FORMVALIDATION, Group, Input, Password, Sheet, SheetHandler, Text, TRANSITION_CURVES, TRANSITIONS, useToast, Variant } from '@zuzjs/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Signin : React.FC = (_props) => {

    const { loading, ID, dispatch } = useStore<typeof AppStore.User>(`user`)
    const router = useRouter();
    const { insert } = useDB(LocalDB.You)
    const toast = useToast()

    const onSuccess = useCallback((resp: dynamic) => {
        insert(`you`, resp.u)
        dispatch({ ...resp.u, loading: false }).then(() => router.push(`${REDIRECT_AFTER_OAUTH}?_=${Date.now()}`))
    }, [])

    const onFailed = useCallback((err: dynamic) => {
        toast.error(err.message)
    }, [])

    useEffect(() => {
        if ( !loading && ID ){
            router.push(`${REDIRECT_AFTER_OAUTH}?_=${Date.now()}`)
        }
    }, [loading, ID])

    return <Group 
        as={`h:100vh w:50vw bg:$surface abs abc flex aic jcc p:150 cols gap:15`}>
        <Form 
            name={`signin`}
            action={`/@/u/signin`}
            onSuccess={onSuccess}
            onError={onFailed}
            errors={{
                em: `Valid email is required`,
                psw: `Password is required`,
            }}
            as={`flex cols w:320 gap:12`}>
            
            <Text as={`s:xl b:700 mb:10`}>Signin to {APP_NAME}</Text>

            <Input name={`em`} placeholder={`Email`} required with={FORMVALIDATION.Email} />
            <Password name={`psw`} placeholder={`Password`} required />
            
            <Button type={`submit`} as={`mt:25 bold`}>Sign in</Button>

            <Text as={`mt:35 s:md`}><Link className={css(`s:md tdn bold &hover(tdu)`)} href={`/u/recover`}>Forgot Password?</Link></Text>
            <Text as={`s:md`}>New here? <Link className={css(`s:md tdn bold &hover(tdu)`)} href={`/u/signup`}>Create account</Link></Text>

        </Form>
    </Group>
}

export default Signin;