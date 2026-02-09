"use client"
import "@/app/css/app.scss";
import { setZuzMap, ThemeProvider, TRANSITION_CURVES, TRANSITIONS, Variant } from "@zuzjs/ui";
import Wrapper from "./wrapper";
import { zuzMap } from "./css/zuzmap";

setZuzMap(zuzMap)

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.zuzcdn.net" />
        <link rel="stylesheet" href="https://fonts.zuzcdn.net/public/wj0HGfqhv/style.css" />
      </head>
      <body>
        <ThemeProvider
          zuzMap={zuzMap}
          variant={Variant.Medium}
          group={{
            fx: {
              transition: TRANSITIONS.SlideInBottom,
              curve: TRANSITION_CURVES.Liquid,
              duration: 0.75
            },
            fxDelay: 0.1,
            fxStep: 0.1,
          }}
          dialog={{
            transition: TRANSITIONS.SlideInBottom,
            curve: TRANSITION_CURVES.Liquid
          }}>
          <Wrapper>{children}</Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout