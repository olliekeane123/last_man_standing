import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getOrCreateValidGameInviteAction } from "@/lib/actions/game.actions"

type InvitePageProps = {
    params: Promise<{ id: string }>
}

export default async function InvitePage(props: InvitePageProps) {
    const params = await props.params
    const { id } = params

    const gameInvite = await getOrCreateValidGameInviteAction(id)

    function handleCopy() {
        navigator.clipboard.writeText(gameInvite.gameInvite?.token as string)
    }

    return (
        <div className="justify-center flex">
            <Card className="w-full max-w-6xl">
                <CardHeader>
                    <CardTitle>Invite More Players</CardTitle>
                    <CardDescription>
                        Get your friends, family, and rivals into your Last Man
                        Standing game. The competition is always better when
                        you&lsquo;re playing against people you know!
                    </CardDescription>
                </CardHeader>
                <CardContent className="justify-center flex">
                    <Card className="w-full bg-secondary">
                        <CardHeader>
                            <CardTitle>
                                Share Your Exclusive Invite Link
                            </CardTitle>
                        </CardHeader>

                        <div className="flex space-x-2 p-5">
                            <Input
                                value={gameInvite.gameInvite?.token}
                                readOnly
                                type="text"
                                className="border-primary"
                            />
                            <Button onClick={handleCopy}>Copy Link</Button>
                        </div>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
