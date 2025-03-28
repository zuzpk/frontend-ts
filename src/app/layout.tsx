"use client"
import "@/app/css/app.scss";
import { ThemeProvider } from "@zuzjs/ui";
import Wrapper from "./wrapper";

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.zuzcdn.net" />
        <link rel="stylesheet" href="https://fonts.zuzcdn.net/public/wj0HGfqhv/style.css" />
      </head>
      <body>
        <ThemeProvider>
          <Wrapper>{children}</Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout