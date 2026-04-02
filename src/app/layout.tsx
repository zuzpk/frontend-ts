import { AUTH_USER_HEADER } from "@/config";
import { User } from "@/types";
import { headers } from "next/headers";
import Wrapper from "./wrapper";

const getInitialUser = async (): Promise<User> => {
  const headerStore = await headers()
  const authUserHeader = headerStore.get(AUTH_USER_HEADER)

  if (!authUserHeader) {
    return {
      loading: false,
      ID: null,
      name: undefined,
      email: undefined,
    }
  }

  try {
    const authUser = JSON.parse(decodeURIComponent(authUserHeader)) as Partial<User>

    return {
      loading: false,
      ID: authUser.ID ?? null,
      name: undefined,
      email: authUser.email ?? undefined,
    }
  }
  catch {
    return {
      loading: false,
      ID: null,
      name: undefined,
      email: undefined,
    }
  }
}

const RootLayout = async ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  const initialUser = await getInitialUser()

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="preconnect" href="https://icons.zuzcdn.net" />
        <link rel="stylesheet" href="https://icons.zuzcdn.net/public/pP52L1YW/style.css" />
      </head>
      <body>
        <Wrapper initialUser={initialUser}>{children}</Wrapper>
      </body>
    </html>
  );
}

export default RootLayout