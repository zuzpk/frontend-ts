"use client"
import { Box, css, Group, Image, Text } from "@zuzjs/ui";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.title = `ZuzJS`
  }, [])

  return <Group as={`h:100vh w:50vw bg:$surface abs abc flex jcc p:150 cols gap:15`}>
      <Image src={`/imgs/zuz-logo.png`} as={`w:75 mb:100`} />
      <Text as={`text-clip bgi:gradient-to-right-$primary-$secondary s:50 b:900`}>To get started, edit the page.tsx file.</Text>
      <Text as={`s:24 `}>Get started by editing <code>src/app/page.tsx</code>.</Text>  
      <Box as={`flex cols`}>
        <Link href={`https://ui.zuz.com.pk/docs`}
          className={css(`bg:$primary tdn p:12,24 r:$radius-lg s:$text-lg bold c:fff flex ass mt:50 &hover(bg:$primary-hover)`)}>Documentation</Link>
      </Box>
  </Group>

}
