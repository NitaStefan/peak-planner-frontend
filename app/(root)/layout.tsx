import React, { ReactNode } from "react"
import LeftSideBar from "@/components/ui/LeftSideBar"

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <LeftSideBar />
      {children}
    </main>
  )
}

export default RootLayout
