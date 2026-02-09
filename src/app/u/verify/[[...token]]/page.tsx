"use client"
import Done from '@/app/done'
import { Box, Button, Cover, css, Form, Group, PinInput, Sheet, SheetHandler, Text, TRANSITION_CURVES, TRANSITIONS, useToast, Variant } from '@zuzjs/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { withPost,dynamic } from "@zuzjs/core"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Verify : React.FC = (_props) => {

    const [ token, em ] = useParams().token ?? [ `token`, `em` ]
    const [ resend, setSend ] = useState(false)
    const [ verifying, setVerifying ] = useState(em ? false : true)
    const [ done, setDone ] = useState<number | null>(0)
    const toast = useToast()

    const onSuccess = (resp : dynamic) => {
        setVerifying(false)
        setDone(resp.name)
    }

    const autoVerify = () => {
        withPost<{
            name: string
        }>(
            `/@/u/verify`,
            { token }
        )
        .then(onSuccess)
        .catch(err => {
            setVerifying(false)
            setDone(err.code == 101 ? 101 : null)
            toast.error(err.message || `Failed to verify account`)
        })
    }

    useEffect(() => {
        
        document.title = `Verify Email`

        if ( em ){
            setTimeout(() => setSend(true), 4000)
        }
        else autoVerify()

    }, [])

    return <Group
        as={`h:100vh w:50vw bg:$surface abs abc flex aic jcc p:150 cols gap:15`}>
        <Cover when={verifying} message={`verfying...`} />
        { done ? done == 101 ? <Done 
            type={`error`}
            title={`Already verified`}
            message={`Your account is already verified. Continue to Login`} />
            : <Done 
            type={`success`}
            title={`Good Job, ${done}`} 
            message={`Your account is verified now. Continue to Login`} />
        : <Form 
            withData={{
                token
            }}
            name={`verify`}
            onSuccess={onSuccess}
            action={`/@/u/verify`}
            errors={{
                otp: `OTP Code is required`,
            }}
            as={`flex cols w:320 gap:12`}>
            
            <Text as={`s:18 mb:10`}>We have sent you a verification code{em ? <> to <b>{decodeURIComponent(em)}</b></> : null}</Text>

            <PinInput name={`otp`} as={`s:xl! b:900`} length={6} required />
            
            <Button type={`submit`} as={`mt:25 bold`}>Verify</Button>

            { resend && <Box as={`mt:25 s:16`}>Code not received? <Link href={`/u/signup?resend=1`} className={css(`tdn bold &hover(tdu)`)}>Re-send code</Link></Box> }

        </Form>}
    </Group>
}

export default Verify;