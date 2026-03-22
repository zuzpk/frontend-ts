"use client"
import "@/app/css/app.scss";
import { setZuzMap, SPINNER, ThemeProvider, TRANSITION_CURVES, TRANSITIONS, Variant } from "@zuzjs/ui";
import { zuzMap } from "./css/zuzmap";
import Wrapper from "./wrapper";

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
          <Wrapper>{children}</Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout