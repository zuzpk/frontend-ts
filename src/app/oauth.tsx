"use client"
import { LocalDB } from '@/config';
import { Store } from '@/store';
import { DB, User } from '@/types';
import { getCookie, removeCookie } from '@zuzjs/core';
import { useDB } from '@zuzjs/hooks';
import { useStore } from '@zuzjs/store';
import React, { useEffect } from 'react';

const Authenticate : React.FC = (_props) => {

    const { getByID, update, insert } = useDB(LocalDB.You)
    const { dispatch } = useStore<User>(Store.User)
    
    useEffect(() => {
        const you = getCookie(`__ud`, true)
        if ( you ){
            try{
                getByID<User>(`you`, you.ID)
                .then((you) => {
                    update(DB.You, you)
                    dispatch({ ...you, loading: false })
                    removeCookie(`__ud`)
                })
                .catch((_err) => {
                    insert(DB.You, you)
                    dispatch({ ...you, loading: false })
                    removeCookie(`__ud`)
                })
            }
            catch(e){

            }
        }
    }, [])

    return null
}

export default Authenticate;