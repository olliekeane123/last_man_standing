import z from "zod";
import { ALL_FIXTURE_STATUSES } from "../fixture";

export const FixturesFiltersFormSchema = z.object({
    statuses: z.array(z.enum(ALL_FIXTURE_STATUSES)).optional(),
})

export const EditFixtureFormSchema = z.object({
    gameweek: z.number().positive().lte(50)
})

export type FixturesFiltersFormData = z.infer<typeof FixturesFiltersFormSchema>;

export type EditFixtureFormData = z.infer<typeof EditFixtureFormSchema>