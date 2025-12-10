import { Card } from "@/components/ui/card"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full h-screen">
            <div className="h-screen justify-center items-center flex">
                <Card className="min-w-md sm:w-md md:w-xl lg:w-3xl max-w-6xl">{children}</Card>
            </div>
        </main>
    )
}
