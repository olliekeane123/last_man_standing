import z from "zod";

export const CreateGameFormSchema = z.object({
    title: z.string().min(1, "Title is required.")
})