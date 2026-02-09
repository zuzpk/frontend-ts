"use client"
import { FB_PIXEL_ID, GA_MEASUREMENT_ID } from "@/config";
import { AppStore, Store } from "@/store";
import createStore from "@zuzjs/store";
import { Box, DialogProvider, ToastProvider } from "@zuzjs/ui";
import { ReactNode, useEffect } from "react";
import Header from "./header";
import Authenticate from "./oauth";
import PushNotifications from "./webpush";
import { useFacebookPixel, useGoogleTagManager } from "@zuzjs/hooks";

const Wrapper = ({ children } : Readonly<{ children: ReactNode; }>) => {

    return <Main>{children}</Main>

}

const Main = ({ children } : { children: ReactNode }) => {

    const { Provider } = createStore(Store.App, AppStore.App)
    const { Provider: UserProvider } = createStore(Store.User, AppStore.User)
    
    const { trackPageView: sendGTPageView } = useGoogleTagManager(GA_MEASUREMENT_ID!)
    const { trackPageView: sendFBPageView } = useFacebookPixel(FB_PIXEL_ID!)

    useEffect(() => {
        sendGTPageView()
        sendFBPageView()
    }, []);

    return <ToastProvider>
        <DialogProvider>
            <Provider>
                <UserProvider>
                    <Box as={`app flex minH:100vh cols`}>
                        <Authenticate />
                        <PushNotifications />
                        <Header />
                        {children}
                    </Box>
                </UserProvider>
            </Provider>
        </DialogProvider>
    </ToastProvider>

}

export default Wrapper