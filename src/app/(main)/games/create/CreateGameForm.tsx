"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateGameFormSchema } from "@/lib/types/schemas/gameSchema"
import { CreateGameFormData } from "@/lib/types/game"
import { createGameAction } from "@/lib/actions/game.actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

export default function CreateGameForm() {
    const defaultValues: CreateGameFormData = {
        title: "",
    }

    const form = useForm<CreateGameFormData>({
        resolver: zodResolver(CreateGameFormSchema),
        defaultValues,
    })

    return (
        <div className="flex flex-col gap-1 sm:px-8 items-center">
            <div>
                <h2 className="font-bold text-2xl">Create a new game</h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(createGameAction)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={() => (
                            <FormItem>
                                <FormLabel>Game title</FormLabel>
                                <Input
                                    placeholder="Your New Game"
                                    type="text"
                                    id="title"
                                    {...form.register("title")}
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                    >
                        {form.formState.isSubmitting
                            ? "Loading..."
                            : "Create game"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
