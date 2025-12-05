import { LoaderIcon } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoaderIcon
                role="status"
                aria-label="Loading"
                className="size-4 animate-spin"
            />
        </div>
    )
}
