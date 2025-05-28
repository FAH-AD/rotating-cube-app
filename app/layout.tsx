import type React from "react"
import { Providers } from "./providers"
import {DatabaseProvider} from "../components/database-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DatabaseProvider>


          {children}
          </DatabaseProvider>
          </Providers>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
