"use client"
import "@/app/css/app.scss";
import { FB_PIXEL_ID, GA_MEASUREMENT_ID, LocalDB } from "@/config";
import { AppStore, Store } from "@/store";
import { DB, User } from "@/types";
import { withCredentials } from "@zuzjs/core";
import { DatabaseProvider, useDB, useFacebookPixel, useGoogleTagManager } from "@zuzjs/hooks";
import createStore from "@zuzjs/store";
import { Box, setZuzMap, SPINNER, ThemeProvider, TRANSITION_CURVES, TRANSITIONS, Variant } from "@zuzjs/ui";
import { ReactNode, useEffect } from "react";
import { zuzMap } from "./css/zuzmap";
import Header from "./header";
import PushNotifications from "./webpush";

setZuzMap(zuzMap)
withCredentials(true)

const Wrapper = ({ children, currentUser } : Readonly<{ 
    children: ReactNode; 
    currentUser: User
}>) => {

    const { Provider } = createStore(Store.App, AppStore.App)
    const { Provider: UserProvider } = createStore(Store.User, currentUser)
    
    const { trackPageView: sendGTPageView } = useGoogleTagManager(GA_MEASUREMENT_ID!)
    const { trackPageView: sendFBPageView } = useFacebookPixel(FB_PIXEL_ID!)

    useEffect(() => {
        sendGTPageView()
        sendFBPageView()
    }, []);

    return <DatabaseProvider options={LocalDB.App}><Provider>
        <UserProvider>
            <Main currentUser={currentUser}>{children}</Main>
        </UserProvider>
    </Provider>
    </DatabaseProvider>
    

}

const Main = ({ children, currentUser } : { children: ReactNode; currentUser: User }) => {

    const { getByID, update, insert } = useDB(LocalDB.App)

    useEffect(() => {
        if ( !currentUser?.loading && currentUser?.ID ){
            getByID<User>(DB.You, currentUser.ID)
            .then(() => {
                update(DB.You, currentUser)
                    .catch(ue => {
                        console.error(`Failed to update user in local DB`, ue)
                    })
            })
            .catch((_err) => {
                insert(DB.You, currentUser)
                    .catch(ie => {
                        console.error(`Failed to insert user in local DB`, ie)
                    })
            })
        }
    }, [])
    

    return <ThemeProvider 
        zuzMap={zuzMap} 
        // forceTheme={COLORTHEME.Light}
        variant={Variant.Medium}
        group={{
            fx: {
            transition: TRANSITIONS.SlideInBottom,
            curve: TRANSITION_CURVES.Liquid
            },
            fxStep: 0.1,
            fxDelay: 0.1
        }}
        spinner={{
            type: SPINNER.Roller
        }}
        toast={{
            curve: TRANSITION_CURVES.Liquid
        }}
        drawer={{
            margin: 20,
            speed: .3
        }}
        dialog={{
            transition: TRANSITIONS.SlideInBottom,
            curve: TRANSITION_CURVES.Liquid
        }}>
        <Box as={`app flex minH:100vh cols`}>
          <PushNotifications />
          <Header />
          {children}
        </Box>
    </ThemeProvider>

}

export default Wrapper