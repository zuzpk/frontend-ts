"use client"
import { ADMIN_EMAIL } from '@/config';
import { Box, Button, Icon, Span, Text, TRANSITION_CURVES, TRANSITIONS, useDelayed, Variant } from '@zuzjs/ui';
import React, { ReactNode } from 'react';

type ErrorProps = {
    code?: string | number | null,
    title?: string | string[],
    message?: string | string[],
    action?: {
        label: ReactNode,
        on: () => void
    }
}

const Error : React.FC<ErrorProps> = ({ code, title, message, action }) => {

    const mounted = useDelayed()
    const _animation = {
        transition: TRANSITIONS.SlideInBottom,
        curve: TRANSITION_CURVES.Bounce,
        duration: .5,
        when: mounted
    }
    const _code = (m: string | number, delay = 0.1) => <Text as={`s:24 bold`} animate={{ ..._animation, delay }}>{m}</Text>
    const _title = (m: string | number, delay = 0.1) => <Text as={`s:18 bold`} animate={{ ..._animation, delay }}>{m}</Text>
    const _msg = (m: string | ReactNode, delay = 0.2) => <Text as={`s:16`} animate={{ ..._animation, delay }}>{m}</Text>

    return <Box as={`rel zIndex:3 app-error w:100% p:20vh,20,20,20 r:$radius flex aic jcc cols`}>
        {_code(code || `psst!`)}

        { Array.isArray(title) ? <>{title?.map((m, i) => _title(m, 0.1 * (i + 1)))}</>
                : _title(title || `it's not you, it's us`)}

        <Box as={`h:10`} />
        { message ? 
            Array.isArray(message) ? <>{message?.map((m, i) => _msg(m, 0.2 * (i + 1)))}</>
                : _msg(message || `we're experiencing an internal server problem.`)
            : !code && <>
                {_msg(`we're experiencing an internal server problem.`)}
                {_msg(<Span>please try again in few or contact <b>{ADMIN_EMAIL}</b></Span>, .4)}
            </>}

        {action && <Box as={`mt:25`} animate={{ ..._animation, delay: .5 }}>
            <Button onClick={() => {
                if ( action?.on ) action.on()
            }} variant={Variant.Small}>{action?.label || `Re-try`}</Button>
        </Box>}
    
    </Box>
}

export default Error;