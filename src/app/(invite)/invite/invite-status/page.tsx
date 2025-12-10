"use client"

import { CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

export default function InviteStatusPage() {
    const searchParams = useSearchParams()

    const errorValue = searchParams.get("error")
    console.log("ERROR:", errorValue)

    return (
        <CardHeader>
            <CardTitle>{errorValue}</CardTitle>
        </CardHeader>
    )
}
