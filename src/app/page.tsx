"use client"
import { Box, Search, Select, Text } from "@zuzjs/ui";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.title = `ZuzJS`
  }, [])

  return <Box as={`w:100vw flex aic jcc h:90vh cols gap:15`}>
      <Text as={`text-clip bgi:gradient-to-right-$primary-$secondary s:36 b:900`}>@zuzjs/ui</Text>
      <Text as={`s:18`}>Get started by editing <code>src/app/page.tsx</code>.</Text>  
    </Box>
}
