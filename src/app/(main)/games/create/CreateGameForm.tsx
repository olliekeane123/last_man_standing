"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateGameFormSchema } from "@/lib/types/schemas/gameSchema"
import { CreateGameFormData } from "@/lib/types/game"
import { createGame } from "@/lib/actions/game.actions"

export default function CreateGameForm() {
    const defaultValues: CreateGameFormData = {
        title: "",
    }

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<CreateGameFormData>({
        resolver: zodResolver(CreateGameFormSchema),
        defaultValues,
    })

    return (
        <div className="flex flex-col gap-1 sm:px-8 items-center">
            <div>
                <h2 className="font-bold text-2xl">Create a new game</h2>
            </div>
            <form onSubmit={handleSubmit(createGame)} className="flex flex-col space-y-3 max-w-2xl">
                <label htmlFor="">Game title</label>
                <input
                    type="text"
                    id="title"
                    {...register("title")}
                />
                {errors.title && <div className="text-red-500">{errors.title.message}</div>}
                <button className="border-1 border-blue-500 cursor-pointer" disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Create game"}
                </button>

                <p>{JSON.stringify(getValues())}</p>
            </form>
        </div>
    )
}
