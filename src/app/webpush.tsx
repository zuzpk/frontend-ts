/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { VAPID_PUBLIC_KEY } from '@/config';
import { withPost } from '@zuzjs/core';
import { usePushNotifications } from '@zuzjs/ui';
import React, { useEffect } from 'react';

const PushNotifications : React.FC = (_props) => {

    const {
        permission,
        subscribe,
    } = usePushNotifications({
        vapidPublicKey: VAPID_PUBLIC_KEY,
        requestPermissionOnMount: true,
    })

    useEffect(() => {
        if ( `granted` == permission ){
            subscribe()
            .then(meta => {
                
                withPost<{
                    kind: string
                }>(
                    `/@/u/push_oauth`,
                    { token: meta }
                )
                .then(() => {})
                .catch(() => {})

            })
        }
    }, [permission, subscribe])

    return <></>
}

export default PushNotifications;