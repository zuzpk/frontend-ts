/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { APP_NAME, LocalDB } from "@/config"
import { Store } from "@/store"
import { User } from "@/types"
import { withPost } from "@zuzjs/core"
import { useDB, useDelayed } from "@zuzjs/hooks"
import { useStore } from "@zuzjs/store"
import { Avatar, Box, Button, ColorScheme, ContextMenu, ContextMenuHandler, css, Icon, Image, SheetHandler, Spinner, Text, useContextMenu } from "@zuzjs/ui"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useRef } from "react"

const Header = () => {

    const me = useStore<User>(Store.User)
    const toast = useRef<SheetHandler>(null)
    const mounted = useDelayed()
    const pathname = usePathname()
    const router = useRouter()
    const userMenu = useRef<ContextMenuHandler>(null)
    const userMenuParent = useRef<HTMLDivElement>(null)
    const { show: showUserMenu } = useContextMenu(userMenu);
    const { remove } = useDB(LocalDB.You)

    const signOut = useCallback(() => {
        me.dispatch({ loading: true });
        withPost(`/@/u/signout`, {})
        .then((_resp) => {
            console.log(`med`, me.ID!)
            remove(`you`, me.ID!)
            me.dispatch({ loading: false, ID: null, oid: null })
            if ( pathname != `/` ){
                router.push(`/?so=${Date.now()}`)
            }
        })
        .catch((err) => {
            toast.current!.error(err.message || `Failed to signout. Please try again.`)
            me.dispatch({ loading: false });
        })
    }, [me])

    return <Box as={[
        `header flex aic p:40,25 rel zIndex:99 &ph(p:20) h:70`,
    ]}>
        <Box as={`logo flex aic flex:1`}>
            <Link href={`/` as any} className={css(`tdn`)}><Box as={`app-logo rel flex aic jcc gap:4 -fx`}>
                <Image src="/imgs/zuz-logo.png" alt={APP_NAME} as={`w:25`} />
                <Text as={`s:18 b:900`} tfx={`fog`}>{APP_NAME}</Text>
                <Box as={`bg:$surface r:5 p:2,4`}>
                    <Text tfx={`fog`} as={`s:14 b:900`}>UI</Text>
                </Box>
                {/* <Text tfx={`fog`} as={`s:14 opacity:0.5`}>v{APP_VERSION}</Text> */}
            </Box></Link>
        </Box> 

        <Box as={`flex aic jce`}>

            { me.loading ? <Spinner /> : 
                me.ID ? <>
                    <Box as={`flex aic gap:10`} ref={userMenuParent}>
                        <Button onClick={(ev) => showUserMenu(ev as any)} as={`bg:transparent! c:$text flex aic gap:6`}>
                            <Avatar alt={me.name} />
                            <Icon name={`arrow-down`} as={`c:$text s:10`} />
                        </Button>
                    </Box>
                    <ContextMenu
                    items={[
                        { label: `Signout`, onSelect: signOut }
                    ]}
                    ref={userMenu} 
                    offsetY={10}
                    offsetX={20}
                    parent={userMenuParent.current!} />
                </>
            : <>
                <Link href={{ pathname: "/u/signin" }} className={css(`bg:$surface tdn p:6,10 r:$radius-lg,0,0,$radius-lg anim:0.1s &hover(bg:$primary scale:1.05)`)}>Sign in</Link>
                <Link href={{ pathname: "/u/signup" }} className={css(`ml:1 bg:$surface tdn p:6,10 r:0,$radius-lg,$radius-lg,0 anim:0.1s &hover(bg:$primary scale:1.05)`)}>Create Account</Link>
            </>}
            <ColorScheme as={`ml:20`} />

        </Box>
    </Box>

}

export default Header