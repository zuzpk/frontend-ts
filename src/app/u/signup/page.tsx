/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"
import { API_URL, APP_NAME, LocalDB, REDIRECT_AFTER_OAUTH } from '@/config';
import { AppStore } from '@/store';
import { dynamic } from '@zuzjs/core';
import { useDB } from '@zuzjs/hooks';
import { useStore } from '@zuzjs/store';
import { Box, Button, css, Form, FORMVALIDATION, Group, Input, Password, Text, TRANSITION_CURVES, TRANSITIONS, useToast, Variant } from '@zuzjs/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Signup : React.FC = (_props) => {

    const { loading, ID, dispatch } = useStore<typeof AppStore.User>(`user`)
    const router = useRouter();
    const { insert } = useDB(LocalDB.You)
    const toast = useToast()

    const onSuccess = useCallback((resp: dynamic) => {
        if ( resp.u ){
            insert(`you`, resp.u)
            dispatch({ ...resp.u }).then(() => router.push(`${REDIRECT_AFTER_OAUTH}?v=${Date.now()}`))
        }
        else{
            router.push(`/u/verify/${resp.token}/${encodeURIComponent(resp.email)}`)
        }
    }, [])

    const onFailed = useCallback((err: dynamic) => {
        toast.error(err.message)
      }, [])

    useEffect(() => {
        if ( !loading && ID ){
            router.push(`${REDIRECT_AFTER_OAUTH}?_=${Date.now()}`)
        }
        document.title = `Sign Up`
    }, [])

    return <Group 
        as={`h:100vh w:50vw bg:$surface abs abc flex aic jcc p:150 cols gap:15`}>
        <Form 
            name={`signup`}
            action={`${API_URL}u/signup`}
            onSuccess={onSuccess}
            onError={onFailed}
            errors={{
                nm: `Name is required`,
                em: `Valid email is required`,
                psw: `Password is required`,
                rpsw: `Passwords do not match`
            }}
            as={`flex cols w:320 gap:12`}>
            
            <Text as={`s:xl b:700 mb:10`}>Sign up for {APP_NAME}</Text>

            <Input name={`nm`} placeholder={`Name`} required />
            <Input name={`em`} placeholder={`Email`} required with={FORMVALIDATION.Email} />
            <Password name={`psw`} placeholder={`Password`} required />
            <Password name={`rpsw`} placeholder={`Repeat Password`} required with={`${FORMVALIDATION.MatchField}@psw`} />

            <Button type={`submit`} as={`mt:25 bold`}>Create Account</Button>

            <Text as={`s:md mv:35`}>By clicking "Create account", you agree to the <Link className={css(`s:md tdn bold &hover(tdu)`)} href={`/help/terms` as any}>{APP_NAME} TOS</Link> and <Link className={css(`tdn bold &hover(tdu)`)} href={`/help/privacy` as any}>Privacy Policy.</Link></Text>
            <Text as={`s:md`}>Already have an account? <Link className={css(`s:md tdn bold &hover(tdu)`)} href={`/u/signin`}>Sign in here</Link></Text>

        </Form>
    </Group>
}

export default Signup;