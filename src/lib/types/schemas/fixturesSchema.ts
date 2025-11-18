import z from "zod";
import { ALL_FIXTURE_STATUSES } from "../fixture";

export const FixturesFiltersFormSchema = z.object({
    statuses: z.array(z.enum(ALL_FIXTURE_STATUSES)).optional(),
})

export type FixturesFiltersFormData = z.infer<typeof FixturesFiltersFormSchema>;