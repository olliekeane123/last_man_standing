"use client"

import { UserButton } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"
import { useEffect, useState } from "react"

export function ThemedUserButton() {
    const { resolvedTheme } = useTheme()

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const theme = resolvedTheme === "dark" ? dark : undefined

    if (!isMounted) {
        return null
    }

    return (
        <UserButton
            appearance={{
                baseTheme: theme,
            }}
        />
    )
}
