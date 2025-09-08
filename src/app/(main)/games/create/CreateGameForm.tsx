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
            <form onSubmit={handleSubmit(createGame)} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Game title</label>
                    <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your New Game"
                        type="text"
                        id="title"
                        {...register("title")}
                    />
                </div>
                {errors.title && <div className="text-red-500">{errors.title.message}</div>}
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Create game"}
                </button>

            </form>
        </div>
    )
}
