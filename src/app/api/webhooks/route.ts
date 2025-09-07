import {
    deleteUserWithClerkId,
    upsertUserWithClerkData,
} from "@/lib/actions/user.actions"
import { DeletedObjectJSON, UserJSON } from "@clerk/nextjs/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const event = await verifyWebhook(req)

        const { type, data } = event

        console.log(`Received webhook: ${type} for user ${data.id}`)

        switch (type) {
            case "user.created":
            case "user.updated":
                await handleUserUpsert(data)
                break

            case "user.deleted":
                await handleUserDeleted(data)
                break

            default:
                console.log(`Unhandled event type: ${type}`)
                return Response.json(
                    { message: "Event type not handled" },
                    { status: 200 }
                )
        }

        console.log(`Successfully processed webhook: ${type}`)
        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("Webhook processing error:", error)
        return Response.json(
            { error: "Webhook verification failed" },
            { status: 400 }
        )
    }
}

async function handleUserUpsert(data: UserJSON) {
    try {
        const { id } = data
        const email = data.email_addresses[0].email_address

        const userData = {
            clerkId: id,
            email,
        }

        await upsertUserWithClerkData(userData)
    } catch (error) {
        throw error
    }
}

async function handleUserDeleted(data: DeletedObjectJSON) {
    try {
        const { id } = data

        if (!id) {
            throw new Error(
                "User deletion failed: Unable to retrieve clerk Id for deletion"
            )
        }

        await deleteUserWithClerkId(id)
    } catch (error) {
        throw error
    }
}
