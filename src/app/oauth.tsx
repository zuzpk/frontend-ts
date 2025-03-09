"use client"
import { LocalDB, SESS_ID } from '@/config';
import { Store } from '@/store';
import { User } from '@/types';
import { useStore } from '@zuzjs/store';
import { useDB } from '@zuzjs/ui';
import Cookies from "js-cookie";
import React, { useEffect } from 'react';

const Authenticate : React.FC = (_props) => {

    const { getByID } = useDB(LocalDB.You)
    const { dispatch } = useStore<User>(Store.User)

    const oauth = async () => {

        getByID<User>(`you`, Cookies.get(SESS_ID)!)
            .then((you) => {
                dispatch({ ...you, loading: false })
            })
            .catch((_err) => {
                dispatch({ loading: false, ID: null })
            })

    }

    useEffect(() => { oauth() }, [])

    return null
}

export default Authenticate;