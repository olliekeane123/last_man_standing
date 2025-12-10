"use client"

import { useSearchParams } from "next/navigation"

export default function InviteStatusPage() {
    const searchParams = useSearchParams()

    const errorValue = searchParams.get("error")
    console.log("ERROR:", errorValue)

    return <div>{errorValue}</div>
}
